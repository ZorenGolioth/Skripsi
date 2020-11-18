<?php

    DEFINED('ML_API') OR exit(header('location: 303'));

    class Pasien_baru extends ML_Controller
    {
        public function __construct()
        {
            parent::__construct();
            $this->library('session, form');
            $this->model('pasien');
        }

        public function index()
        {
            # VALIDATES PERSONAL DETAILS
            $this->form->input('fullname:Fullname is required!,
                                address:Address is required!,
                                phone:Phone is required!,
                                dob:Date of Birth is required!,
                                gender:Gender is required!');

            # VALIDATES USER DETAILS
            $this->form->input('username:Username is required!,
                                email:Email is required!,
                                password:Password is required!,
                                rePassword:Retype password is required!');
            
            if($this->form->validate())
            {
                # PERSONAL DETAILS
                $fullname   = uc_all($this->input->post('fullname'));
                $address    = uc_all($this->input->post('address'));
                $phone      = $this->input->post('phone');
                $dob        = $this->input->post('dob');
                $gender     = $this->input->post('gender');

                # USER DETAILS
                $username   = $this->input->post('username');
                $email      = $this->input->post('email');
                $password   = $this->input->post('password');
                $rePassword = $this->input->post('rePassword');
                $connError  = IMAGES_PATH . 'error/connectionError.png';

                # VALIDATES PHONE
                if(!is_numeric($phone))
                {
                    exit(json_encode('Oops..., Ada kesalahan!'."\n".'Nomor telfon tidak bisah huruf.'));
                }

                # VALIDATES EMAIL
                if (!filter_var($email, FILTER_VALIDATE_EMAIL))
                {
                    exit(json_encode('Oops..., Ada kesalahan!'."\n".'Masukan format email yang valid.'));
                }
                
                $user_exist = $this->pasien_model->user_user($email);
                if($user_exist > 0)
                {
                    exit(json_encode("Oops..., Ada kesalahan! \Email \"$email\" sudah digunakan."));
                }

                # CHECKS & SETS PASSWORD
                if($password !== $rePassword)
                {
                    exit(json_encode('Oops..., Ada kesalahan!'."\n".'Password tidak cocok.'));
                }
                $password   = sha1($password);
                
                $user_exist = $this->pasien_model->user_user($username);
                if($user_exist > 0)
                {
                    exit(json_encode("Oops..., Ada kesalahan! \nUsername \"$username\" sudah digunakan."));
                }
                
                # insert
                $this->model->data('username', $username)
                            ->data('email', $email)
                            ->data('tipe_user', 'Pasien')
                            ->data('password', $password)
                            ->insert('user');

                # id user
                $id_user  = $this->model->insert_id(); 

                # insert
                $this->model->data('id_user', $id_user)
                            ->data('nama_pasien', $fullname)
                            ->data('alamat_pasien', $address)
                            ->data('tl_pasien', $dob)
                            ->data('telpon_pasien', $phone)
                            ->data('jenis_kelamin', $gender)
                            ->insert('data_pasien');
                
                $returnData = "$fullname::$address::$phone::$dob::$gender::$id_user::$username::$email::$connError";
                $this->model->close_conn();
                exit(json_encode("1|$returnData"));
            }
            else
            {
                exit(json_encode('Oops..., Ada kesalahan!'."\n".'Masih ada input yang kosong'));
            }
        }
    }
?>