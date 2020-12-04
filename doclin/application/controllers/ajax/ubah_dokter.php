<?php

    DEFINED('AJAX') OR exit(header('location:403'));

    class Ubah_dokter extends ML_Controller
    {
        public function __construct()
        {
            parent::__construct();

            # load session library
            $this->library('session, form');

            # check if login
            $this->session->access_check('un_auth', 'login', true);

            # load model
            $this->model('admin');
        }

        public function index()
        {
            $this->form->input('nama_dokter:Nama dokter harus diisi.,
                                jenis_kelamin:Jenis kelamin harus dipilih.,
                                tanggal_lahir:Tanggal lahir harus diisi.,
                                spesialis:Spesialis harus diisi.,
                                sub_spesialis:Sub spesialis harus diisi.,
                                pendidikan:Pendidikan harus dipilih.,
                                jam_m:Jam mulai harus dipilih.,
                                jam_s:Jam selesai harus dipilih.');
            
            if($this->form->validate())
            {
                $id_dokter      = $this->input->post('id_dokter');
                $nama_dokter    = uc_all($this->input->post('nama_dokter'));
                $jenis_kelamin    = $this->input->post('jenis_kelamin');
                $tanggal_lahir    = $this->input->post('tanggal_lahir');
                $spesialis    = $this->input->post('spesialis');
                $sub_spesialis    = $this->input->post('sub_spesialis');
                $pendidikan    = $this->input->post('pendidikan');
                $jam_m    = $this->input->post('jam_m');
                $jam_s    = $this->input->post('jam_s');
                $jadwal = $jam_m.' - '.$jam_s;

                # update
                $this->model->set('nama_dokter', $nama_dokter)
                            ->set('jenis_kelamin', $jenis_kelamin)
                            ->set('tanggal_lahir', $tanggal_lahir)
                            ->set('spesialis', $spesialis)
                            ->set('sub_spesialis', $sub_spesialis)
                            ->set('pendidikan', $pendidikan)
                            ->set('jadwal_jam', $jadwal)
                            ->where('id_dokter', $id_dokter)
                            ->update('dokter');
                
                $this->model->close_conn();
                exit('1|Berhasil ubah dokter.');
            }
            else
            {
                exit('0|'.$this->form->empty());
            }
        }
    }
