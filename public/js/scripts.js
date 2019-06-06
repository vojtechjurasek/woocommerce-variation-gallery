jQuery(document).ready(function($) {
  if ($(".product > .summary > .variations_form").length > 0) {
    var variation_form = $(".product > .summary > .variations_form");
    variation_form.on("woocommerce_variation_has_changed", function(
      event,
      variation
    ) {
      //variation changed
      //disable default main image change by wc
      variation_form.wc_variations_image_update(false);

      var variation = variation_form
        .find("input.variation_id")
        .eq(0)
        .val();

      var ajaxData = {
        action: "wvg_change_images",
        variation: variation
      };

      var gallery = $(".product")
        .find(".images")
        .eq(0);

      $.post(wvg_ajax.ajax_url, ajaxData, function(result) {
        if (result != "error") {
          variation_form.trigger("woocommerce_before_variation_has_changed");
          gallery.replaceWith(result);
          $(".woocommerce-product-gallery").each(function() {
            $(this).wc_product_gallery();
          });
          variation_form.trigger("woocommerce_after_variation_has_changed");
        } else {
          console.log("Error changing product variation gallery", result);
        }
      });
    });

    variation_form.on("wc_variations_image_update");
  }
});
