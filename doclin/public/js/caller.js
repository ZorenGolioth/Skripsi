$(function(){
    ML.do('submit', '#tambahKlinik', tambah_data, 'ajax/tambah-klinik', 'admin', '#tambahKlinik');
    ML.do('submit', '#ubahKlinik', tambah_data, 'ajax/ubah-klinik', 'admin', '#ubahKlinik');

    ML.do('submit', '#tambahDokter', tambah_data, 'ajax/tambah-dokter', 'admin/dokter', '#tambahDokter');
    ML.do('submit', '#ubahDokter', tambah_data, 'ajax/ubah-dokter', 'admin/dokter', '#ubahDokter');

    ML.do('submit', '#tambahDokterKlinik', tambah_data, 'ajax/tambah-dokter-klinik', '', '#tambahDokterKlinik');

    ML.do('submit', '#tambahStaff', tambah_data, 'ajax/tambah-staff', '', '#tambahStaff');
});