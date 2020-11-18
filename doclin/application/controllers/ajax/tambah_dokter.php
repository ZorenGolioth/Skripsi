<?php

    DEFINED('AJAX') OR exit(header('location:403'));

    class Tambah_dokter extends ML_Controller
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
                                pendidikan:Pendidikan harus dipilih.');
            
            if($this->form->validate())
            {
                $nama_dokter    = uc_all($this->input->post('nama_dokter'));
                $jenis_kelamin    = $this->input->post('jenis_kelamin');
                $tanggal_lahir    = $this->input->post('tanggal_lahir');
                $spesialis    = $this->input->post('spesialis');
                $sub_spesialis    = $this->input->post('sub_spesialis');
                $pendidikan    = $this->input->post('pendidikan');

                # insert
                $this->model->data('nama_dokter', $nama_dokter)
                            ->data('jenis_kelamin', $jenis_kelamin)
                            ->data('tanggal_lahir', $tanggal_lahir)
                            ->data('spesialis', $spesialis)
                            ->data('sub_spesialis', $sub_spesialis)
                            ->data('pendidikan', $pendidikan)
                            ->insert('dokter');
                
                $this->model->close_conn();
                exit('1|Berhasil tambahkan dokter.');
            }
            else
            {
                exit('0|'.$this->form->empty());
            }
        }
    }
