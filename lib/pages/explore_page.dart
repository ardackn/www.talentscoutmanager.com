import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart'; // Oluşturulan dosyayı import et
import 'package:firebase_auth/firebase_auth.dart';
import 'package:talescout_virsual_code/pages/profile_detail_page.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:talescout_virsual_code/main.dart';
import 'package:talescout_virsual_code/pages/notification_service.dart';
import 'package:video_player/video_player.dart';

// Video akışı için özel bir widget
import 'package:talescout_virsual_code/pages/video_card.dart'; // Video kartı için

class ExplorePage extends StatefulWidget {
  const ExplorePage({super.key});

  @override
  State<ExplorePage> createState() => _ExplorePageState();
}

class _ExplorePageState extends State<ExplorePage> {
  // Filtre durumlarını tutacak değişkenler
  String? _selectedBranch;
  RangeValues? _selectedAgeRange;
  // Pagination için state değişkenleri
  final List<DocumentSnapshot> _talents = [];
  DocumentSnapshot? _lastDocument;
  bool _isLoadingMore = false;
  bool _hasMore = true;
  final int _documentsPerPage = 15;

  final ScrollController _scrollController = ScrollController();

  final List<String> _branches = [
    'Futbol',
    'Basketbol',
    'Voleybol',
    'Tenis',
    'Yüzme',
  ]; // Örnek branşlar

  @override
  void initState() {
    super.initState();
    // Kullanıcı giriş yaptığında bildirim servisini başlat
    NotificationService().initialize(navigatorKey);
    _getInitialTalents();

    // Video akışı için scroll listener
    _scrollController.addListener(() {
      if (_scrollController.position.pixels ==
          _scrollController.position.maxScrollExtent) {
        _getMoreTalents();
      }
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  //Video akışı için initial data
  Future<void> _getInitialTalents() async {
    setState(() {
      _talents.clear();
      _lastDocument = null;
      _hasMore = true;
    });
    await _getMoreTalents();
  }

  //Video akışı için sonraki dataları getirir
  Future<void> _getMoreTalents() async {
    if (_isLoadingMore || !_hasMore) return;

    setState(() {
      _isLoadingMore = true;
    });
    Query query = FirebaseFirestore.instance
        .collection('videos')
        .orderBy('timestamp', descending: true)
        .limit(_documentsPerPage);

    // Branş filtresini uygula
    if (_selectedBranch != null) {
      query = query.where('branch', isEqualTo: _selectedBranch);
    }
    // Yaş filtresini uygula
    if (_selectedAgeRange != null) {
      query = query
          .where(
            'age',
            isGreaterThanOrEqualTo: _selectedAgeRange!.start.round(),
          )
          .where('age', isLessThanOrEqualTo: _selectedAgeRange!.end.round());
    }

    if (_lastDocument != null) {
      query = query.startAfterDocument(_lastDocument!);
    }

    final querySnapshot = await query.get();

    if (querySnapshot.docs.length < _documentsPerPage) {
      _hasMore = false;
    }

    if (querySnapshot.docs.isNotEmpty) {
      _lastDocument = querySnapshot.docs.last;
    }

    setState(() {
      _talents.addAll(querySnapshot.docs);
      _isLoadingMore = false;
    });
  }

  void _showFilterDialog() async {
    showModalBottomSheet(
      context: context,
      builder: (context) {
        // BottomSheet'in kendi state'ini yönetmesi için StatefulBuilder kullanıyoruz
        return StatefulBuilder(
          builder: (BuildContext context, StateSetter setModalState) {
            return Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Filtrele',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 20),
                  // Branş Filtresi
                  DropdownButtonFormField<String>(
                    value: _selectedBranch,
                    hint: const Text('Branş Seçin'),
                    items: _branches.map((String branch) {
                      return DropdownMenuItem<String>(
                        value: branch,
                        child: Text(branch),
                      );
                    }).toList(),
                    onChanged: (value) {
                      setModalState(() => _selectedBranch = value);
                    },
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 20),
                  // Yaş Filtresi
                  Text(
                    'Yaş Aralığı: ${(_selectedAgeRange ?? const RangeValues(10, 30)).start.round()} - ${(_selectedAgeRange ?? const RangeValues(10, 30)).end.round()}',
                  ),
                  RangeSlider(
                    values: _selectedAgeRange ?? const RangeValues(10, 30),
                    min: 10,
                    max: 30,
                    divisions: 20,
                    labels: RangeLabels(
                      (_selectedAgeRange ?? const RangeValues(10, 30)).start
                          .round()
                          .toString(),
                      (_selectedAgeRange ?? const RangeValues(10, 30)).end
                          .round()
                          .toString(),
                    ),
                    onChanged: (values) {
                      setModalState(() => _selectedAgeRange = values);
                    },
                  ),
                  const SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      TextButton(
                        onPressed: () {
                          setState(() {
                            _selectedBranch = null;
                            _selectedAgeRange = null;
                            _getInitialTalents();
                          });
                          Navigator.pop(context);
                        },
                        child: const Text('Temizle'),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          _getInitialTalents();
                          Navigator.pop(context);
                        },
                        child: const Text('Uygula'),
                      ),
                    ],
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // Mevcut kullanıcının adını alıp selamlama mesajında kullanıyoruz.
        title: Text(
          AppLocalizations.of(context)!.helloUser(
            FirebaseAuth.instance.currentUser?.displayName ?? 'Kullanıcı',
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.video_call),
            tooltip: 'Video Yükle',
            onPressed: () {
              Navigator.pushNamed(context, '/upload-video');
            },
          ),
          IconButton(
            icon: const Icon(Icons.filter_list),
            tooltip: 'Filtrele',
            onPressed: _showFilterDialog,
          ),
          IconButton(
            icon: const Icon(Icons.group_add),
            tooltip: 'Arkadaşlık İstekleri',
            onPressed: () {
              Navigator.pushNamed(context, '/friend-requests');
            },
          ),
          IconButton(
            icon: const Icon(Icons.people),
            tooltip: 'Arkadaşlarım',
            onPressed: () {
              Navigator.pushNamed(context, '/friends-list');
            },
          ),
          IconButton(
            icon: const Icon(Icons.message),
            tooltip: AppLocalizations.of(context)!.messages,
            onPressed: () {
              Navigator.pushNamed(context, '/chat-list');
            },
          ),
          IconButton(
            icon: const Icon(Icons.edit),
            tooltip: AppLocalizations.of(context)!.editProfile,
            onPressed: () {
              Navigator.pushNamed(context, '/edit-profile');
            },
          ),
          IconButton(
            icon: const Icon(Icons.settings),
            tooltip: AppLocalizations.of(context)!.settings,
            onPressed: () {
              Navigator.pushNamed(context, '/settings');
            },
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: AppLocalizations.of(context)!.logout,
            onPressed: () async {
              // Önce Firebase'den çıkış yap
              await FirebaseAuth.instance.signOut();
              // Sonra Google hesabından çıkış yap
              await GoogleSignIn().signOut();
              // Kullanıcıyı başlangıç sayfasına yönlendir
              Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false);
            },
          ),
        ],
      ),
      body: _talents.isEmpty && _isLoadingMore
          ? const Center(child: CircularProgressIndicator())
          : _talents.isEmpty && !_isLoadingMore
          ? Center(child: Text(AppLocalizations.of(context)!.noTalentFound))
          : ListView.builder(
              itemCount: _talents.length + (_hasMore ? 1 : 0),
              controller: _scrollController,
              padding: const EdgeInsets.all(8.0),
              itemBuilder: (context, index) {
                if (index == _talents.length) {
                  return _hasMore
                      ? const Center(child: CircularProgressIndicator())
                      : const SizedBox.shrink();
                }
                return VideoCard(video: _talents[index]);
              },
            ),
    );
  }
}

