<?php

    DEFINED('ML_API') OR exit(header('location: 303'));

    class Semua_klinik extends ML_Controller
    {
        public function __construct()
        {
            parent::__construct();
            $this->library('session, form');
            $this->model('pasien');
        }

        public function index()
        {
            $result	    = $this->pasien_model->semua_klinik();
            $json_data["records"] = array();
            foreach($result as $row)
            {
                $data['total_dokter']    = $this->pasien_model->total_dokter($row['id_klinik']);
                array_push($json_data["records"], array_merge($row, $data));
            }
            echo json_encode($json_data);
        }

        public function dokter_klinik()
        {
            $id_klinik  = $this->input->post('id_klinik', true);
            $id_user    = $this->input->post('id_user', true);
            $result	    = $this->pasien_model->semua_dokter_klinik($id_klinik);
            $json_data["records"] = array();
            foreach($result as $row)
            {
                $data['booking']    = $this->pasien_model->cek_booking($row['id_dokter'], $id_user);
                array_push($json_data["records"], array_merge($row, $data));
            }
            echo json_encode($json_data);
        }
    }
    
?>  