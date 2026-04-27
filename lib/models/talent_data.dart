class TalentData {
  final String name;
  final String email;
  final int age;
  final String sport;
  final String role;
  final String status;
  final String membership;
  final int score;
  final int speed;
  final int technique;
  final int stamina;
  final bool isPro;
  final String joinDate;

  TalentData({
    required this.name,
    required this.email,
    required this.age,
    required this.sport,
    required this.role,
    required this.status,
    required this.membership,
    required this.score,
    required this.speed,
    required this.technique,
    required this.stamina,
    required this.isPro,
    required this.joinDate,
  });
}

final List<TalentData> featuredTalents = [
  TalentData(name: "Kaan Cetin", email: "cetin49@hotmail.com", age: 17, sport: "Football", role: "Member", status: "Inactive", membership: "Free", score: 100, speed: 39, technique: 61, stamina: 18, isPro: false, joinDate: "2026-03-16"),
  TalentData(name: "Mehmet Bulut", email: "bulut53@hotmail.com", age: 19, sport: "Football", role: "Member", status: "Inactive", membership: "Free", score: 100, speed: 37, technique: 63, stamina: 14, isPro: false, joinDate: "2025-06-19"),
  TalentData(name: "Cagan Karakaya", email: "cagan.karakaya@gmail.com", age: 16, sport: "Football", role: "Member", status: "Active", membership: "Free", score: 50, speed: 40, technique: 10, stamina: 85, isPro: true, joinDate: "2025-12-22"),
  TalentData(name: "Ibrahim Cetin", email: "cetin79@hotmail.com", age: 19, sport: "Football", role: "Member", status: "Active", membership: "Free", score: 20, speed: 14, technique: 6, stamina: 91, isPro: true, joinDate: "2026-02-21"),
  TalentData(name: "Taha Sahin", email: "sahin92@hotmail.com", age: 50, sport: "Football", role: "Member", status: "Active", membership: "Free", score: 50, speed: 50, technique: 0, stamina: 96, isPro: false, joinDate: "2025-05-19"),
  TalentData(name: "Umut Aslan", email: "umut726@gmail.com", age: 26, sport: "Football", role: "Member", status: "Active", membership: "Free", score: 20, speed: 16, technique: 4, stamina: 71, isPro: false, joinDate: "2024-08-19"),
  TalentData(name: "Efe Duman", email: "efe.duman@gmail.com", age: 16, sport: "Football", role: "Member", status: "Active", membership: "Free", score: 20, speed: 10, technique: 10, stamina: 12, isPro: false, joinDate: "2025-09-23"),
  TalentData(name: "Kutay Genc", email: "kutay711@gmail.com", age: 25, sport: "Football", role: "Member", status: "Active", membership: "Free", score: 100, speed: 59, technique: 41, stamina: 36, isPro: true, joinDate: "2026-02-27"),
  TalentData(name: "Efe Yildiz", email: "efe300@gmail.com", age: 14, sport: "Football", role: "Premium Member", status: "Active", membership: "Premium", score: 250, speed: 112, technique: 138, stamina: 62, isPro: false, joinDate: "2025-05-22"),
  TalentData(name: "Miran Yilmaz", email: "miran739@gmail.com", age: 24, sport: "Football", role: "Member", status: "Active", membership: "Free", score: 100, speed: 79, technique: 21, stamina: 5, isPro: false, joinDate: "2026-02-05"),
  TalentData(name: "Can Karakaya", email: "can.karakaya@gmail.com", age: 14, sport: "Football", role: "Member", status: "Active", membership: "Free", score: 100, speed: 58, technique: 42, stamina: 90, isPro: false, joinDate: "2026-01-14"),
  TalentData(name: "Eren Erdogan", email: "eren878@gmail.com", age: 15, sport: "Football", role: "Member", status: "Active", membership: "Free", score: 100, speed: 90, technique: 10, stamina: 253, isPro: true, joinDate: "2025-07-13"),
  TalentData(name: "Batuhan Erdogan", email: "batuhan856@gmail", age: 13, sport: "Football", role: "Member", status: "Active", membership: "Free", score: 100, speed: 84, technique: 16, stamina: 114, isPro: false, joinDate: "2025-05-21"),
];
