<?php

    DEFINED('ML_API') OR exit(header('location: 303'));

    class Login extends ML_Controller
    {
        public function __construct()
        {
            parent::__construct();
            $this->library('session, form');
            $this->model('pasien');
        }

        public function index()
        {            
            $this->form->input('LiUnEmail:Email or Username is required!,
                                LiPassword:Password is required!');
            
            if($this->form->validate())
            {
                $email      = $this->input->post('LiUnEmail');
                $password   = sha1($this->input->post('LiPassword'));

                $user_exist = $this->pasien_model->user_exist($email, $password);
                if($user_exist > 0)
                {
                    $row        = $this->pasien_model->user_exist($email, $password, 1);
                    $username   = $row['username'];
                    $email      = $row['email'];
                    $id_user    = $row['id_user'];

                    $row        = $this->pasien_model->data_pasien($id_user);
                    $fullname   = $row['nama_pasien'];
                    $gender     = $row['jenis_kelamin'];
                    $address    = $row['alamat_pasien'];
                    $dob        = $row['tl_pasien'];
                    $phone      = $row['telpon_pasien'];
                    $connError  = IMAGES_PATH . 'error/connectionError.png';

                    $returnData = "$fullname::$address::$phone::$dob::$gender::$id_user::$username::$email::$connError";
                    $this->model->close_conn();
                    exit(json_encode("1|$returnData"));
                }
                else
                {
                    $this->user_error('Oops..., Login gagal!'."\n".'Silahkan coba kembali.');
                }
            }
            else
            {
                $this->user_error('Oops..., Ada kesalahan!'."\n".'Masih ada input yang kosong');
            }
        }
    }
?>  