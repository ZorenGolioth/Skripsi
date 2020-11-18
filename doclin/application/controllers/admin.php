<?php

    DEFINED('BASE_URL') OR exit(header('location:403'));

    class Admin extends ML_Controller
    {
        public function __construct()
        {
            parent::__construct();

            # load library
            $this->library('session, form');

            # load my library
            $this->my_library('left_menu');

            # check if login
            $this->session->access_check('un_auth', 'login');

            # verify user level access
            $this->session->user_level('Admin', $this->session->ul_auth, '404');

            # load model
            $this->model('admin');
        }

        public function index()
        {
            $data['semua_klinik'] = $this->admin_model->semua_klinik();
            $this->view('admin/home', $data);
        }

        public function dokter()
        {
            $data['semua_dokter'] = $this->admin_model->semua_dokter();
            $this->view('admin/dokter', $data);
        }

        public function tambah_dokter()
        {
            $this->view('admin/tambah_dokter');
        }

        public function ubah_dokter()
        {
            $data['dokter'] = $this->admin_model->satu_dokter(uri3);
            $this->view('admin/ubah_dokter', $data);
        }

        public function delete_dokter()
        {
            $this->model->where('id_dokter', uri3)
                        ->delete('dokter');

            $this->model->close_conn();
            header("location: ".BASE_URL.'admin/dokter');
        }

        public function klinik()
        {
            if(defined('uri2'))
            {
                $data['dokter_klinik'] = $this->admin_model->semua_dokter_klinik(uri4);
                $this->view('admin/dokter_klinik', $data);
            }
            else
            {
                $data['semua_klinik'] = $this->admin_model->semua_klinik();
                $this->view('admin/home', $data);
            }
        }

        public function tambah_klinik()
        {
            $this->view('admin/tambah_klinik');
        }

        public function ubah_klinik()
        {
            $data['klinik'] = $this->admin_model->satu_klinik(uri3);
            $this->view('admin/ubah_klinik', $data);
        }

        public function delete_klinik()
        {
            $this->model->where('id_klinik', uri3)
                        ->delete('klinik');

            $this->model->close_conn();
            header("location: ".BASE_URL.'admin');
        }

        public function tambah_dokter_klinik()
        {
            $data['dokter'] = $this->admin_model->bukan_dokter_klinik();
            $this->view('admin/tambah_dokter_klinik', $data);
        }

        public function delete_dokter_klinik()
        {
            $this->model->where('id_dokter_klinik', uri3)
                        ->delete('dokter_klinik');

            $this->model->close_conn();
            header("location: ".BASE_URL.'admin/klinik/'.uri3.'/'.uri4);
        }

        public function staff()
        {
            $data['staff_klinik'] = $this->admin_model->staff_klinik();
            $this->view('admin/staff', $data);
        }

        public function tambah_staff()
        {
            $data['klinik'] = $this->admin_model->bukan_klinik();
            $this->view('admin/tambah_staff', $data);
        }

        public function delete_staff()
        {
            $this->model->where('id_user', uri3)
                        ->delete('user');

            $this->model->close_conn();
            header("location: ".BASE_URL.'admin/staff');
        }
    }
