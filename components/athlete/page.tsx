import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="container min-h-screen py-24 max-w-4xl mx-auto px-6 text-slate-300">
      <h1 className="text-4xl font-black mb-8 font-clash text-white bg-gradient-to-r from-[var(--red-primary)] to-red-500 bg-clip-text text-transparent">
        İade ve İptal Politikası
      </h1>
      
      <div className="space-y-8 leading-relaxed font-dm">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-white font-clash">Dijital Hizmet Kapsamı</h2>
          <p>TSM, anında erişim sağlanan dijital bir SaaS (Yazılım Hizmeti) platformudur. Satın alınan paketlerin dijital içerik doğası gereği, hizmet kullanımı başladıktan sonra cayma hakkı sınırlıdır.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-white font-clash">İade Şartları</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>AI analiz işlemi başlatılmış veya premium verilere erişim sağlanmış paketlerde iade yapılmamaktadır.</li>
            <li>Hizmetin teknik bir aksaklık nedeniyle verilemediği durumlarda, talepler 14 gün içinde değerlendirilir.</li>
            <li>İade talepleri her durumun özel şartlarına göre (case-by-case) titizlikle incelenmektedir.</li>
          </ul>
        </section>

        <section className="bg-white/5 p-8 rounded-3xl border border-white/10 mt-12">
          <h2 className="text-xl font-bold mb-4 text-white font-clash">İade Talebi Oluşturma</h2>
          <p>İade talepleriniz için lütfen aşağıdaki kanallardan bizimle iletişime geçin:</p>
          <p className="mt-2"><strong>Adres:</strong> İzzetpaşa, Şişli/İstanbul</p>
          <p><strong>E-posta:</strong> dcctsm@gmail.com</p>
        </section>
      </div>

      <div className="mt-12 text-sm text-slate-500 text-center">
        Son Güncelleme: Mart 2025
      </div>
    </div>
  );
}