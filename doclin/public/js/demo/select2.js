var Select2 = {
    init: function() {
        $("#m_select2_1, #m_select2_1_validate").select2({
            placeholder: "Pilih"
        }), $("#m_select2_2, #m_select2_2_validate").select2({
            placeholder: "Pilih"
        }), $("#m_select2_3, #m_select2_3_validate").select2({
            placeholder: "Pilih"
        }), $("#dokter").select2({
            placeholder: "Pilih dokter"
        }), $("#klinik").select2({
            placeholder: "Pilih klinik"
        }), $("#m_select2_modal").on("shown.bs.modal", function() {
            $("#m_select2_1_modal").select2({
                placeholder: "Select a state"
            }), $("#m_select2_2_modal").select2({
                placeholder: "Select a state"
            }), $("#m_select2_3_modal").select2({
                placeholder: "Select a state"
            }), $("#m_select2_4_modal").select2({
                placeholder: "Select a state",
                allowClear: !0
            })
        })
    }
};
jQuery(document).ready(function() {
    Select2.init()
});