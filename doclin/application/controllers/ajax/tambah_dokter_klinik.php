<?php

    DEFINED('AJAX') OR exit(header('location:403'));

    class Tambah_dokter_klinik extends ML_Controller
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
            $this->form->input('id_dokter:Nama dokter harus dipilih.');
            
            if($this->form->validate())
            {
                // $oid_dokter     = $this->input->post('oid_dokter');
                $id_dokter      = $this->input->post('id_dokter');
                $id_klinik      = $this->input->post('id_klinik');
                $nama_klinik    = $this->input->post('nama_klinik');

                # insert
                $this->model->data('id_dokter', $id_dokter)
                            ->data('id_klinik', $id_klinik)
                            ->insert('dokter_klinik');
            
                $this->model->close_conn();
                exit('r|Berhasil tambahkan dokter klinik.|admin/klinik/'.$nama_klinik.'/'.$id_klinik);
            }
            else
            {
                exit('0|'.$this->form->empty());
            }
        }
    }
