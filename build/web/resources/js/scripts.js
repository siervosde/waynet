// All scripts

$(document).ready(function(e) {

	//Team previews expand
	var $teammate = $('.team-mate');
	var clickable = $('.prev-page, .home-page, .submenu li a');
	$teammate.click(function(){
		$('.pt-page').animate({scrollTop: $(this).offset().top}, 500);
		$teammate.removeClass('expanded').find('a').css({'outline':'none', 'text-decoration':'none'});
		if($(this).hasClass('frst')){
			$teammate.removeClass('frst');
		} else {
			$teammate.removeClass('frst');
			$(this).addClass('frst');
			$(this).addClass('expanded');
		}
	});
	
	clickable.click(function(){
		$teammate.removeClass('expanded');
	});
	
	
	//Thumbs grid init
	Grid.init();

});

var cantidad =0;

$(document).ready(function(){
          $("#btnAddMore").click(function(){
          	$("#cargandoForm").show(50);
              $.ajax({
	                'url':urlEnviada+'?idProducto='+$("#cboProductoID").val()+'&cnt='+$("#cntProducto").val()+'&prec='+$("#precUnitCarga").val(),
	                'success':function(data){
	                   if(data=="0")
	                   		alert("La Cantidad Debe ser Mayor a 0");
	                   	else if(data=="1")
	                   		alert("El Precio Unitario Es Menor al establecido por el gerente");
	                   	else if(data=="2")
	                   		alert("No Hay Existencias");
	                   	else{
	                   		
                   			cantidad+=Math.round(parseFloat(parseFloat($("#cntProducto").val())*parseFloat($("#precUnitCarga").val())) * 100) / 100;
                   			
	                   		
	                   		$("#lbltotal").html(cantidad);
	                   		$("#tbodyFactura").append(data);
	                   		$("#cargandoForm").hide(1000);
	                   	}
	                }        
	            });
          });
      });

$(document).ready(function(){
	$("#btnEnviarCompra").click(function(){
		if(cantidad!=0){
			var id=0;
			$("#cargandoForm").show(1000);
			var bandera=false;
			if(confirm("Deseas Imprimir Ticket"))
				bandera=true;
			$.ajax({
				type:'POST',
				url: $("#frmFinal").attr('action')+"?impresa="+bandera,
				data: $("#frmFinal").serialize(),
				success : function(dataSubAjax){
					
					$("#cargandoForm").hide(1000);
					if(bandera){
						window.open(factura+"?id="+dataSubAjax);	
					}else{
						alert("Compra Realizada Con Exito");
					}
					$("#tbodyFactura").html("");
					
					$("#lbltotal").html("");
					cantidad=0;

				}
			});
		}else{
			alert("Debe Agregar Al Menos un Producto");
		}
	});
});	

$(document).ready(function(){
	$(document).on("click",".btnEliminarTD",function(){
		if(confirm("Está seguro de eliminar item?")) {
			$("#"+$(this).data("attribute")).remove();	
			cantidad-=$(this).data("total");
			$("#lbltotal").html(cantidad);
		}
	});
	
});


$(document).ready(function(){
	$(document).on("change","#cboProductoID",function(){
		  $.ajax({
                'url':cargaUnitario+'?id='+$("#cboProductoID").val(),
                'success':function(data){
                   $("#precUnitCarga").val(data);
                }        
            });
	});
	if(cargaPrevio){
		$.ajax({
	        'url':cargaUnitario+'?id='+$("#cboProductoID").val(),
	        'success':function(data){
	           $("#precUnitCarga").val(data);
	        }        
	    });
	}	
});


function loadScripts(array,callback){
          var loader = function(src,handler){
              var script = document.createElement("script");
              script.src = src;
              script.onload = script.onreadystatechange = function(){
              script.onreadystatechange = script.onload = null;
                      handler();
              }
              var head = document.getElementsByTagName("head")[0];
              (head || document.body).appendChild( script );
          };
          (function(){
              if(array.length!=0){
                      loader(array.shift(),arguments.callee);
              }else{
                      callback && callback();
              }
          })();
      }