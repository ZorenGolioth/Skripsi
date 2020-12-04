<?php
	DEFINED('BASE_URL') OR exit(header('location:403'));

	doctype().
	to('html').
	to('head');
		base_url();
		title('Doclin');
		tag('meta', 'charset::utf-8');
		responsive_meta();
		
		css('vendors/fullcalendar/fullcalendar.bundle');
		css('vendors/vendors.bundle');
		css('demo/style.bundle');
		css('demo/datatables.bundle');
		css('overide');
		bar_icon();
	tc('head');
?>
	
	<body class="m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--fixed m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default">
		<div class="m-grid m-grid--hor m-grid--root m-page">
			<!-- BEGIN: Header -->
			<?php $this->view('content/header'); ?>
			<!-- END: Header -->			
			<div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
				<!-- BEGIN: Aside Menu -->
				<?php $this->view('content/left_menu'); ?>
				<!-- END: Aside Menu -->
				<div class="m-grid__item m-grid__item--fluid m-wrapper">
					<div class="m-subheader ">
						<div class="d-flex align-items-center">
							<div class="mr-auto">
								<ul class="m-subheader__breadcrumbs m-nav m-nav--inline">
									<li class="m-nav__item m-nav__item--home">
										<a href="" class="m-nav__link m-nav__link--icon">
											<i class="m-nav__link-icon la la-home"></i>											
										</a>
									</li>
									<li class="m-nav__separator">-</li>
									<li class="m-nav__item m-nav__item--home">
										<a href="admin/dokter" class="m-nav__link">
											<span class="m-nav__link-text">Daftar dokter</span>									
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="m-content">
						<div class="m-portlet m-portlet--last m-portlet--head-lg m-portlet--responsive-mobile">
							<div class="m-portlet__head">
								<div class="m-portlet__head-caption">
									<div class="m-portlet__head-title">
										<span class="m-portlet__head-icon">
											<i class="fa fa-edit"></i>
										</span>
										<h3 class="m-portlet__head-text">
											Ubah dokter
										</h3>
									</div>
								</div>
							</div>

							<div class="m-portlet__body">
								<div class="tab-content">
									<div class="tab-pane active" id="m_tabs_1_1" role="tabpanel">
										<form class="m-form m-form--fit m-form--label-align-right" id="ubahDokter">
											<div class="form-group m-form__group row">
												<label class="col-xl-2 col-lg-2 col-form-label">Nama dokter</label>
												<div class="col-xl-10 col-lg-10">
													<input class="form-control m-input" type="text" autocomplete="off" name="nama_dokter" placeholder="nama dokter" value="<?php echo $dokter['nama_dokter']; ?>">
													<input type="hidden" name="id_dokter" value="<?php echo $dokter['id_dokter']; ?>">
													<div class="m--font-danger ml_input_eh set_error" id="nama_dokter"></div>
												</div>
											</div>
                                            
											<div class="form-group m-form__group row">
												<label class="col-xl-2 col-lg-2 col-form-label">Jenis kelamin</label>
												<div class="col-xl-10 col-lg-10">
													<select class="form-control" name="jenis_kelamin">
														<option value="" <?php selected($dokter['jenis_kelamin'], ''); ?>>--- Pilih jenis kelamin ---</option>
														<option value="Laki - Laki" <?php selected($dokter['jenis_kelamin'], 'Laki - Laki'); ?>>Laki - Laki</option>
														<option value="Perempuan" <?php selected($dokter['jenis_kelamin'], 'Perempuan'); ?>>Perempuan</option>
													</select>
													<div class="m--font-danger ml_input_eh set_error" id="jenis_kelamin"></div>
												</div>
											</div>

											<div class="form-group m-form__group row">
												<label class="col-xl-2 col-lg-2 col-form-label">Tanggal lahir</label>
												<div class="col-xl-10 col-lg-10">
													<input class="form-control m-input" type="date" autocomplete="off" name="tanggal_lahir" value="<?php echo $dokter['tanggal_lahir']; ?>">
													<input type="hidden" name="id_dokter" value="<?php echo $dokter['id_dokter']; ?>">
													<div class="m--font-danger ml_input_eh set_error" id="tanggal_lahir"></div>
												</div>
											</div>

											<div class="form-group m-form__group row">
												<label class="col-xl-2 col-lg-2 col-form-label">Spesialis</label>
												<div class="col-xl-10 col-lg-10">
													<input class="form-control m-input" type="text" autocomplete="off" name="spesialis" placeholder="spesialis" value="<?php echo $dokter['spesialis']; ?>">
													<input type="hidden" name="id_dokter" value="<?php echo $dokter['id_dokter']; ?>">
													<div class="m--font-danger ml_input_eh set_error" id="spesialis"></div>
												</div>
											</div>

											<div class="form-group m-form__group row">
												<label class="col-xl-2 col-lg-2 col-form-label">Sub spesialis</label>
												<div class="col-xl-10 col-lg-10">
													<input class="form-control m-input" type="text" autocomplete="off" name="sub_spesialis" placeholder="sub spesialis" value="<?php echo $dokter['sub_spesialis']; ?>">
													<input type="hidden" name="id_dokter" value="<?php echo $dokter['id_dokter']; ?>">
													<div class="m--font-danger ml_input_eh set_error" id="sub_spesialis"></div>
												</div>
											</div>
                                            
											<div class="form-group m-form__group row">
												<label class="col-xl-2 col-lg-2 col-form-label">Pendidikan</label>
												<div class="col-xl-10 col-lg-10">
													<select class="form-control" name="pendidikan">
														<option value="" <?php selected($dokter['pendidikan'], ''); ?>>--- Pilih pendidikan ---</option>
														<option value="S1" <?php selected($dokter['pendidikan'], 'S1'); ?>>S1</option>
														<option value="S2" <?php selected($dokter['pendidikan'], 'S2'); ?>>S2</option>
														<option value="S3" <?php selected($dokter['pendidikan'], 'S3'); ?>>S3</option>
													</select>
													<div class="m--font-danger ml_input_eh set_error" id="pendidikan"></div>
												</div>
											</div>

											<div class="form-group m-form__group row">
												<label class="col-xl-2 col-lg-2 col-form-label">Jadwal senin - jumat</label>
												<div class="col-xl-5 col-lg-5">
													<input class="form-control m-input" type="time" autocomplete="off" name="jam_m" value="<?php echo explode(' - ', $dokter->jadwal_jam)[0]; ?>">
													<div class="m--font-danger ml_input_eh set_error" id="jam_m"></div>
												</div>
												<div class="col-xl-5 col-lg-5">
													<input class="form-control m-input" type="time" autocomplete="off" name="jam_s" value="<?php echo explode(' - ', $dokter->jadwal_jam)[1]; ?>">
													<div class="m--font-danger ml_input_eh set_error" id="jam_s"></div>
												</div>
											</div>

											<div class="form-group m-form__group row">
												<div class="col-xl-2 col-lg-2"></div>
												<div class="col-xl-10 col-lg-10 ca-btn">
													<button class="btn btn-success m-btn m-btn--air m-btn--custom">
														<i class="fa fa-edit"></i> &nbsp;Ubah dokter
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div id="m_scroll_top" class="m-scroll-top">
			<i class="la la-arrow-up"></i>
		</div>
		
		<?php
			ajax();
			web_js('https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont');
			js('vendors/vendors.bundle');
			js('demo/scripts.bundle');
			js('vendors/fullcalendar/fullcalendar.bundle');
			js('demo/select2');
			js('demo/toastr');
		?>

		<script>
			WebFont.load({
				google: {
					"families": ["Poppins:300,400,500,600,700", "Roboto:300,400,500,600,700"]
				},
				active: function() {
					sessionStorage.fonts = true;
				}
			});
		</script>
	</body>
</html>