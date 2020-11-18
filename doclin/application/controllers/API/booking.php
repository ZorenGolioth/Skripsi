<?php

    DEFINED('ML_API') OR exit(header('location: 303'));

    class Booking extends ML_Controller
    {
        public function __construct()
        {
            parent::__construct();
            $this->library('session, form');
            $this->model('pasien, admin');
        }

        public function index()
        {
            $row    = $this->admin_model->currentTime();
            $DT     = $row['date_time'];
            $date   = explode(' ', $DT)[0];
            
            $id_user    = $this->input->post('id_user', true);

            $row        = $this->pasien_model->satu_reservasi($id_user, $date);
            $id_dokter  = $row['id_dokter'];

            $cek_booking    = $this->pasien_model->cek_user_booking($id_dokter, $id_user, $date);
            if($cek_booking > 0)
            {
                $result  = $this->pasien_model->semua_booking($id_dokter, $id_user, $date);
            }
            else
            {
                $result  = $this->pasien_model->cek_user_booking($id_dokter, $id_user, $date, '');
            }

            $json_data["records"] = array();
            foreach($result as $row)
            {
                $dokter = $this->pasien_model->satu_dokter($row['id_dokter']);
                $data['nama_dokter']    = $dokter['nama_dokter'];
                $data['spesialis']      = $dokter['spesialis'];
                $data['sub_spesialis']  = $dokter['sub_spesialis'];

                $pasien = $this->pasien_model->data_pasien($row['id_pasien']);
                $data['nama_pasien']    = $pasien['nama_pasien'];
                array_push($json_data["records"], array_merge($row, $data));
            }
            echo json_encode($json_data);
        }

        public function not_done()
        {
            $row    = $this->admin_model->currentTime();
            $DT     = $row['date_time'];
            $date   = explode(' ', $DT)[0];
            
            $id_user    = $this->input->post('id_user', true);

            $row        = $this->pasien_model->satu_reservasi($id_user, $date);
            $id_dokter  = $row['id_dokter'];

            $not_done   = $this->pasien_model->not_done($id_dokter, $date);
            echo json_encode($not_done);
        }

        public function sekarang()
        {
            $id_dokter = $this->input->post('id_dokter', true);
            $id_pasien = $this->input->post('id_pasien', true);
            
            $this->model->data('id_dokter', $id_dokter)
                        ->data('id_pasien', $id_pasien)
                        ->insert('reservasi');

            $this->model->close_conn();
            echo json_encode('|berhasil!');
        }

        public function batal()
        {
            $id_reservasi = $this->input->post('id_reservasi', true);
            
            $this->model->where('id_reservasi', $id_reservasi)
                        ->delete('reservasi');

            $this->model->close_conn();
            echo json_encode('|berhasil!');
        }
    }
    
?>  