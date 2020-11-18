<?php

    DEFINED('BASE_URL') OR exit(header('location:403'));

    class Pasien_model extends ML_Model
    {
        public function user_user($UnEmail, $type = 'c')
        {
            return $this->all('user')
                        ->where("username::$UnEmail")
                        ->or("email::$UnEmail")
                        ->get($type);
        }

        public function user_exist($UnEmail, $pass, $type = 'c')
        {
            return $this->all('user')
                        ->where("username::$UnEmail")
                        ->and("password::$pass")
                        ->or("email::$UnEmail")
                        ->and("password::$pass")
                        ->get($type);
        }

        public function semua_klinik($type = '')
        {
            return $this->all('klinik')->get($type);
        }

        public function semua_dokter_klinik($id_klinik, $type = '')
        {
            return $this->all('dokter')
                        ->where('id_dokter')
                            ->in_select('id_dokter')
                            ->from('dokter_klinik')
                            ->where('id_klinik', $id_klinik)->close()
                        ->get($type);
        }

        public function cek_booking($id_dokter = '', $id_pasien = '', $type = 'c')
        {
            return $this->all('reservasi')
                        ->where('id_dokter', $id_dokter)
                        ->and('id_pasien', $id_pasien)
                        ->and('done','0')
                        ->get($type);
        }

        public function semua_booking($id_dokter = '', $id_pasien = '', $date = '', $type = '')
        {
            return $this->all('reservasi')
                        ->where('id_dokter', $id_dokter)
                        ->and('tanggal_reservasi', $date)
                        ->and('done','0')
                        ->get($type);
        }

        public function cek_user_booking($id_dokter = '', $id_pasien = '', $date = '', $type = 'c')
        {
            return $this->all('reservasi')
                        ->where('id_dokter', $id_dokter)
                        ->and('id_pasien', $id_pasien)
                        ->and('tanggal_reservasi', $date)
                        ->and('done','0')
                        ->get($type);
        }

        public function satu_reservasi($id, $tgl)
        {
            return $this->all('reservasi')
                        ->where('id_pasien', $id)
                        ->and('tanggal_reservasi', $tgl)
                        ->get(1);
        }

        public function satu_dokter($id)
        {
            return $this->all('dokter')
                        ->where('id_dokter', $id)
                        ->get(1);
        }

        public function data_pasien($id_user)
        {
            return $this->all('data_pasien')
                        ->where('id_user', $id_user)
                        ->get(1);
        }

        public function not_done($id, $tgl, $type = 'c')
        {
            return $this->all('reservasi')
                        ->where('id_dokter', $id)
                        ->and('done', '0')
                        ->and('tanggal_reservasi', $tgl)
                        ->get($type);
        }

        public function total_dokter($id_klinik)
        {
            return $this->all('dokter_klinik')
                        ->where('id_klinik', $id_klinik)
                        ->get('c');
        }

    }    
?>