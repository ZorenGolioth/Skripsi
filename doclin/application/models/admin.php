<?php

    DEFINED('BASE_URL') OR exit(header('location: 403'));

    class Admin_model extends ML_Model
    {
        public function cek_login($username, $pass, $type = 'c')
        {
            return $this->all('user')
                        ->where('username', $username)
                        ->and('password', $pass)
                        ->get($type);
        }

        public function semua_klinik($type = '')
        {
            return $this->all('klinik')->get($type);
        }

        public function satu_klinik($id)
        {
            return $this->all('klinik')
                        ->where('id_klinik', $id)
                        ->get(1);
        }

        public function semua_dokter($type = '')
        {
            return $this->all('dokter')->get($type);
        }

        public function satu_dokter($id)
        {
            return $this->all('dokter')
                        ->where('id_dokter', $id)
                        ->get(1);
        }

        public function bukan_dokter_klinik($type = '')
        {
            return $this->all('dokter')
                        ->where('id_dokter')
                            ->not_in_select('id_dokter')
                            ->from('dokter_klinik')->close()
                        ->get($type);
        }

        public function semua_dokter_klinik($id_klinik, $type = '')
        {
            return $this->all('dokter_klinik')
                        ->where('id_klinik', $id_klinik)
                        ->get($type);
        }

        public function cek_dokter($id, $type = 'c')
        {
            return $this->all('klinik')
                        ->where('id_dokter', $id)
                        ->get($type);
        }

        public function bukan_klinik($type = '')
        {
            return $this->all('klinik')->get($type);
        }

        public function staff_klinik($type = '')
        {
            return $this->select('u.id_user, u.nama_user, k.nama_klinik')
                        ->from('user u, klinik k')
                        ->where('u.id_klinik', 'k.id_klinik', 'at')
                        ->get($type);
        }

        public function cek_staff_klinik($id, $type = 'c')
        {
            return $this->all('user')
                        ->where('id_klinik', $id)
                        ->get($type);
        }

        public function reservasi($id = '', $type = '')
        {
            return $this->select('r.id_reservasi, r.terima, d.nama_dokter, p.nama_pasien')
                        ->from('reservasi r, dokter d, data_pasien p')
                        ->where('r.id_dokter', 'd.id_dokter', 'at')
                        ->and('r.id_pasien', 'p.id_user', 'at')
                        ->and('done', '0')
                        ->and('d.id_dokter')
                            ->in_select('id_dokter')
                            ->from('dokter_klinik')
                            ->where('id_klinik', $id)->close()
                        ->order_by('r.id_reservasi')
                        ->get($type);
        }

        public function cek_hariIni($tgl = '', $type = 'c')
        {
            return $this->all('reservasi')
                        ->where('tanggal_reservasi', $tgl)
                        ->and('terima', '1')
                        ->order_by('id_reservasi desc')
                        ->get($type);
        }

        public function currentTime($type = 1)
        {
            return $this->select("CURRENT_TIMESTAMP() AS date_time")->get($type);
        }
    }