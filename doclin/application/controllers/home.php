<?php

    DEFINED('BASE_URL') OR exit(header('location:403'));

    class Home extends ML_Controller
    {
        public function __construct()
        {
            parent::__construct();

            # load library
            $this->library('session');

            # load my_library
            $this->my_library('left_menu');

            # load model
            $this->model('admin');

            # check if login
            $this->session->access_check('un_auth', 'login');
        }

        public function index()
        {
            if(strtolower($this->session->get('ul_auth')))
            {
                $data['semua_klinik'] = $this->admin_model->semua_klinik();
                $this->view('admin/home', $data);
            }
        }
    }
