<?php

    DEFINED('AJAX') OR exit(header('location:403'));

    class Ubah_klinik extends ML_Controller
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
            $this->form->input('nama_klinik:Nama klinik harus diisi.,
                                lokasi_klinik:Lokasi klinik harus diisi.,
                                telpon:Nomor telpon harus diisi.');
            
            if($this->form->validate())
            {
                $id_klinik      = $this->input->post('id_klinik');
                $nama_klinik    = uc_all($this->input->post('nama_klinik'));
                $lokasi_klinik  = uc_all($this->input->post('lokasi_klinik'));
                $telpon  = $this->input->post('telpon');

                # update
                $this->model->set('nama_klinik', $nama_klinik)
                            ->set('lokasi_klinik', $lokasi_klinik)
                            ->set('telpon', $telpon)
                            ->where('id_klinik', $id_klinik)
                            ->update('klinik');
            
                $this->model->close_conn();
                exit('1|Berhasil ubah klinik.');
            }
            else
            {
                exit('0|'.$this->form->empty());
            }
        }
    }
