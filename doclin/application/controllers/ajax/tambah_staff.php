<?php

    DEFINED('AJAX') OR exit(header('location:403'));

    class Tambah_staff extends ML_Controller
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
            $this->form->input('id_klinik:Klinik harus dipilih.,
                                nama_staff:Nama staff harus diisi.,
                                username:Username harus diisi.');
            
            if($this->form->validate())
            {
                $username   = $this->input->post('username');
                $password   = sha1($username);
                $id_klinik  = $this->input->post('id_klinik');
                $nama_staff = uc_all($this->input->post('nama_staff'));

                $cek_staf   = $this->admin_model->cek_staff_klinik($id_klinik);
                if($cek_staf > 0)
                {
                    exit('Staff untuk klinik yang dipilih suda ada!');
                }

                # insert
                $this->model->data('nama_user', $nama_staff)
                            ->data('id_klinik', $id_klinik)
                            ->data('tipe_user', 'Staff')
                            ->data('username', $username)
                            ->data('password', $password)
                            ->insert('user');
            
                $this->model->close_conn();
                exit('r|Berhasil tambahkan staff klinik.|admin/staff');
            }
            else
            {
                exit('0|'.$this->form->empty());
            }
        }
    }
