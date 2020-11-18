<?php

    DEFINED('BASE_URL') OR exit(header('location:403'));

    class Staff extends ML_Controller
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
            $this->session->user_level('Staff', $this->session->ul_auth, '404');

            # load model
            $this->model('admin');
        }

        public function index()
        {
            $data['reservasi'] = $this->admin_model->reservasi($this->session->idk_auth);
            $this->view('staff/home', $data);
        }

        public function terima_reservasi()
        {
            $row    = $this->admin_model->currentTime();
            $DT     = $row['date_time'];
            $date   = explode(' ', $DT)[0];

            $cek    = $this->admin_model->cek_hariIni($date);
            if($cek > 0)
            {
                $row    = $this->admin_model->cek_hariIni($date, 1);
                $no_antrian = $row['no_antrian'] + 1;
            }
            else
            {
                $no_antrian = 1;
            }

            $this->model->set('terima', '1')
                        ->set('tanggal_reservasi', 'now()', 'at')
                        ->set('no_antrian', $no_antrian)
                        ->where('id_reservasi', uri3)
                        ->update('reservasi');

            
            $this->model->close_conn();
            header("location: ".BASE_URL.'staff');
        }

        public function hapus_reservasi()
        {
            $this->model->where('id_reservasi', uri3)
                        ->delete('reservasi');
            
            $this->model->close_conn();
            header("location: ".BASE_URL.'staff');
        }

        public function selesai_reservasi()
        {
            $this->model->set('done', '1')
                        ->where('id_reservasi', uri3)
                        ->update('reservasi');

            
            $this->model->close_conn();
            header("location: ".BASE_URL.'staff');
        }
    }