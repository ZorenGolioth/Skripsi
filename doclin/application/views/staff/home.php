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
								</ul>
							</div>
						</div>
					</div>
					<div class="m-content">
						<div class="row">
							<div class="col-lg-12">
								<div class="m-portlet m-portlet--mobile">
									<div class="m-portlet__head">
										<div class="m-portlet__head-caption">
											<div class="m-portlet__head-title">
												<h3 class="m-portlet__head-text">
													Daftar klinik
												</h3>
											</div>
										</div>
									</div>
									<div class="m-portlet__body">
										<div>
											<table class="table m-table m-table--head-bg-success" id="m_table_1">
												<thead>
													<tr>
														<th>No</th>
														<th>Nama dokter</th>
														<th>Nama pasien</th>
														<th>Tanggal</th>
														<th>Waktu</th>
														<th>Status</th>
														<th>Action</th>
													</tr>
												</thead>
												<tbody>
													<?php
													$no     = 0;
													foreach($reservasi as $row)
													{
														$no++;
														$id_reservasi	= $row['id_reservasi'];
														$nama_dokter	= $row['nama_dokter'];
														$nama_pasien	= $row['nama_pasien'];
														$terima			= $row['terima'];
														$tanggal_reservasi	= $row['tanggal_reservasi'];
														$waktu_reservasi	= $row['waktu_reservasi'];
														
														?>
														<tr>
															<td><?php echo $no; ?></td>
															<td>
																<a href="admin/klinik/<?php echo str_replace(' ', '-', $nama_dokter).'/'.$id_reservasi; ?>" data-skin="dark" data-toggle="m-tooltip" data-placement="top" title="Lihat">
																	<?php echo set_data($nama_dokter); ?>
																</a>
															</td>
															<td><?php echo $nama_pasien; ?></td>
															<td><?php echo set_data($tanggal_reservasi); ?></td>
															<td><?php echo set_data($waktu_reservasi); ?></td>
															<td>
																<?php if($terima === '0'){ ?>
																	<span class="m--font-danger">Belum</span>
																<?php } else { ?>
																	<span class="m--font-success">Suda</span>
																<?php } ?>
															</td>
															<td>
																<?php if($terima === '0'){ ?>
																	<a href="staff/terima-reservasi/<?php echo $id_reservasi; ?>" class="m-portlet__nav-link btn m-btn m-btn--hover-success m-btn--icon m-btn--icon-only m-btn--pill">
																		<i class="m-menu__link-icon fa fa-check"></i>
																	</a>
																	<a href="staff/hapus-reservasi/<?php echo $id_reservasi; ?>" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill">
																		<i class="m-menu__link-icon fa fa-times"></i>
																	</a>
																<?php } else { ?>
																	<a href="staff/selesai-reservasi/<?php echo $id_reservasi; ?>" class="m-portlet__nav-link btn m-btn m-btn--hover-success m-btn--icon m-btn--icon-only m-btn--pill">
																		<i class="m-menu__link-icon fa fa-check"></i>
																	</a>
																<?php } ?>
															</td>
														</tr>
													<?php } ?>
												</tbody>
											</table>
										</div>
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
			js('demo/basic');
			js('demo/toastr');
			js('demo/datatables.bundle');
			js('demo/scrollable');
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