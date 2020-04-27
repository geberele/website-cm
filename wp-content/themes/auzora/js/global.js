(function(j){
	
		/* === CUFON === */
		function doCufon()
		{
			Cufon.replace('h1,h2,h3,h4,h5', {hover: 'true'});

			if ( (j.browser.msie) && (parseInt(j.browser.version) == 8) ) {
				/*do nothing with cufon*/
			} else {
			  Cufon.replace('.tooltip_right, .two-columns strong', {hover: 'true'});
			}

			
		}
		
		/*The Animated Div*/
		function doAction()
		{
			/*Call the Scollpane plugin*/
			j('.texts').jScrollPane({showArrows : true, scrollbarWidth: 5, arrowSize: 1});
			
			
			j('.anchor-to').each(function(){
				j(this).bind('click', function(){

					var anchor = j(this).attr('href');
					var id = j(this).attr('rel');
					var boxActive = j('.show');
					var antitle = j(this).next('span').text();
					var totitle = antitle + ' | ' + j("meta[name=site_name]").attr('content');
					
					/*if var id = 0, its mean the landing page(div) is called, than make litle different with site title*/
					if(id == "0") totitle = j("meta[name=site_name]").attr('content') + ' | ' + j("meta[name=site_desc]").attr('content');

							if( (j(anchor).css('top')) != '0px'){
								j('.press').removeClass('press');
								j(this).parent('li').addClass('press');
								
								
								j('.left_wrap').animate({width : '35px', bottom: '0px', left : '437px'}, 150);
								j('.right_wrap').animate({width : '35px', bottom: '0px', right : '437px'}, 150);
								
								boxActive.animate({top : '-660px'}, 150, function(){
									j(this).removeClass('show');
									
									/*animate the shadow*/
									j('.left_wrap').delay(500).animate({width : '470px', bottom: '0px', left : '0px'}, 200);
									j('.right_wrap').delay(500).animate({width : '470px', bottom: '0px', right : '0px'}, 200);
									
									/*Change all Scroll into TOP*/
									var elsa = j('.texts'); 
									for (var i=0; i<elsa.length; i++) {
										elsa[i].scrollTo(0);
									}
									
									/*if the anchor == portfolio div then call the different function.*/
									if( id == j("meta[name=portfolio_id]").attr('content') ){
									
										j('.portfolio_thumb').find('img').css('display', 'none');
										j('.keker').removeClass('keker');
										
										j('#thisport').delay(500).animate({top: '0px'}, 200, function(){
											j(this).addClass('show');
											j('#portfolio_lists').tgPreload({childClass:'inside_port'});
											
											/*Write the new title, based on page title*/
											if(j.browser.msie){
												document.title = totitle;
											} else {
												j('title').text(totitle);
											}
											
										});
										
									} else {
									
										j(anchor).delay(500).animate({top: '0px'}, 200, function(){
											j(this).addClass('show');
											
											/*Write the new title, based on page title*/
											if(j.browser.msie){
												document.title = totitle;
											} else {
												j('title').text(totitle);
											}
											
										});
										
									}
									/*Call the ajax to create the Cookie*/
									// cookiesHandler(id);
								});
							}

					return false;
				});
				
				/*Hover effect in menu/navigation*/
				j(this).hover( function(){
					var lipar = j(this).parent('li');
					var tooltip = lipar.find('.nav_tooltip');
					if ( j.browser.msie ){
						Cufon.now();
						tooltip.stop().css({opacity : 0, visibility : 'visible'}).animate({ opacity : 0.8 , left : '58px'}, 200);
					} else {
						tooltip.stop().css({opacity : 0, visibility : 'visible'}).animate({ opacity : 1.00 , left : '58px'}, 200);
					}
				}, function(){
					var lipar = j(this).parent('li');
					var tooltip = lipar.find('.nav_tooltip');
					
					tooltip.stop().animate({ opacity : 0 , left : '80px'}, 200, function(){
						j(this).css({opacity : 1, visibility : 'hidden'});
					});			
				
				});
			});
			
			/*Throw the cookies with ajax. to remember the last visited div*/
			function cookiesHandler(id){
						var theUrl = j("meta[name=info_url]").attr('content');
						var theId = id;

									j.ajax({
									   type: "POST",
									   url: theUrl,
									   data: "change_page=true&pg_id=" + theId,
									   success: function(){
											return;
									   }
									 });
					return;
			}			
		}
		
/* ==== AJAX handle the portfolio pagination ==== */		
		function doAjaxforP(){
			
			j('.page_ajax').each(function(){
				
				j(this).bind('click', function(){
					
					if(j(this).hasClass('current_page')){
						/*do nothing*/
					} else {
					
						var theUrl = j("meta[name=info_url]").attr('content');
						var page = j(this).attr('rel');
						
						j.ajax({
							type: "POST",
							url: theUrl,
							data: "action=true&pages=" + page ,
							success: function(msg){
								j('#portfolio_lists').find('div').fadeOut('fast', function(){ 
									/*create cookie to remember the last page*/
									document.cookie ='pages='+page+';path=/';
									j('#portfolio_lists').html();
									j('#portfolio_lists').html(msg);/*insert blank loader*/
									/*then reload the browser, need to do this to make prettyPhoto works*/
									window.location.reload();

									return;
								});
								
							}
						});
						
						j('.current_page').removeClass('current_page');
						j(this).addClass('current_page');
						
					}
					
					return false;
				});
			
			})
			
		}

/* ==== social media link, hover effect ==== */
		function mediaHover(){
			var social = j('#social').find('a');
			social.each( function(){
				j(this).hover(function(){
					j(this).stop().animate({top : '-4px'}, 200);
				}, function(){
					j(this).stop().animate({top : '0px'}, 200);
				});
			});
		}

/*hover effect in portfolio items*/		
		function inHoverImage(){
			var prTo = j('#portfolio_lists').find('a');
			
			prTo.each(function(){
				j(this).hover(function(){
					var thisimg = j(this).find('img');
					
					if( thisimg.css('top') == '0px' ){/*only do the effect when item has top = 0px */					
						thisimg.stop().animate({opacity : 0.6}, 300);
					}
					if(j(this).parent().hasClass('ploader')){
						j(this).parent().removeClass('ploader').addClass('keker');
					}
				}, function(){
					var thisimg = j(this).find('img');
					if( thisimg.css('top') == '0px' ){/*only do the effect when item has top = 0px */	
						j(this).find('img').stop().animate({opacity : 1}, 300);
					}
				});
			});
			
		}
		
/* contact form handle */	
	function ContactHandle()
	{
		j('#contact_submit').click( function() {
		
			var name = j('#hname').val();
			var mail = j('#hmail').val();
			var subs = j('#hsubj').val();
			var mess = j('#hmess').val();
			var sendto = j('#sendto').val();
			
			j('.contactload').fadeIn('fast');
			
			if (name != "" && mail != "" && subs != "" && mess != "")
				{
					var uril = j("#urlto").val();

					j.ajax(
						{
							url: uril,
							type: 'GET',
							data: "hname=" + name + "&hmail=" + mail + "&hsubj=" + subs + "&hmess=" + mess + "&sendto=" + sendto,
							success: function(result) 
							{
								j('.contactload').fadeOut('fast');
								if(result == "email_error") {
									j('#hmail').next('.req').html(' ! <small>please enter your valid email address</small>');
								} else {
									j('#hname, #hmail, #hsubj, #hmess').val("");
									j('<p id="contact_success">' + result + '<span class="jq_close"></span></p>').insertBefore('#adm-contact');
									j('.jq_close').click(function(){
										j(this).parent().fadeOut(300, function(){ j(this).remove(); });
									});
								}
							}
						}
					);
					return false;
					
				} 
			else 
				{
					j('.contactload').fadeOut('fast');
					if(name == "") j('#hname').next('.req').text(' !');
					if(mail == "") j('#hmail').next('.req').text(' !');
					if(subs == "") j('#hsubj').next('.req').text(' !');
					if(mess == "") j('#hmess').next('.req').text(' !');
					return false;
				}
		});
		
			j('#hname, #hmail, #hsubj, #hmess').focus(function(){
				j(this).next('.req').text(' *');
			});
		
	}
	
	/*Call the functions when DOM ready*/
	j(document).ready(function(){
		doCufon();
		doAction();
		mediaHover();
		ContactHandle();
		doAjaxforP();
		j("a[rel^='prettyPhoto']").prettyPhoto({theme:'facebook'});
	});	

	
	j(window).load(function() {
		if( (j('#thisport').css('top')) == '0px' ){
			j('#portfolio_lists').tgPreload({childClass:'inside_port'});/*do the preload image when the specific div shown*/
		}
		inHoverImage();
	});
	
})(jQuery.noConflict());