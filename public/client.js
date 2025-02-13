var global_client_typing_mode = false;
function rgba(ctx,i,j)
{
	var imgData = ctx.getImageData(i,j,1,1);
	var red = imgData.data[0];
	var green = imgData.data[1];
	var blue = imgData.data[2];
	var alpha = imgData.data[3];
	return "rgba("+red+","+green+","+blue+","+alpha+")";
}

function setSeedList(arr)
{
	var div = document.getElementById("seed_list");
	div.innerHTML = "";
	for(var ii=0;ii<arr.length;ii++)
	{
		var img = new Image();
		img.onload = function()
		{
			var n = Math.floor(20/this.width);
			
			var cnv = document.createElement("canvas");
			cnv.width = this.width;
			cnv.height = this.height;
			cnv.id="normal-seed-canvas-"+this.id;
			var ctx = cnv.getContext("2d");
			ctx.drawImage(this,0,0);
			
			var cnv2 = document.createElement("canvas");
			cnv2.width = this.width*n;
			cnv2.height = this.height*n;
			var ctx2 = cnv2.getContext("2d");
			for(var j=0;j<cnv2.height;j+=n)
			{
				for(var i=0;i<cnv2.width;i+=n)
				{
					ctx2.fillStyle = rgba(ctx,i/n,j/n);
					ctx2.fillRect(i,j,n,n);
				}
			}
			cnv2.id="seed-canvas-"+this.id;
			cnv2.classList.toggle("seed-unbordered");
			cnv2.src = this.src;
			
			cnv2.onclick = selectSaveCanvas;
			
			//if(cnv2 == undefined) return;
			div.appendChild(cnv);
			div.appendChild(cnv2);
			
		}
		img.src = '/sims/'+arr[ii];
		img.id = ""+ii;
		 
	}	
	
	
}

function loadDivFirst(callback)
{
		  
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', '/load_div_first', true);
		
	xhr.onload = function(e) {  
		
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {    alert(xhr.status + ': ' + xhr.statusText); return;  }
				
			document.getElementById("first").innerHTML = xhr.responseText;
			
			var arr = JSON.parse(document.getElementById("seed_list").innerHTML);
			
			setSeedList(arr);
			
			callback();
	
			
	}
		
	xhr.send();
	
}

function setInitialImageToCanvas()
{
	var canvas = document.getElementById("canvas");
	if(canvas == null) throw new Error("Canvas "+canvas_id+" not found");
	
	var img = new Image();
	img.onload = function() {
		
		var ctx = canvas.getContext("2d");
		canvas.width = this.width;
		canvas.height = this.height;
		ctx.drawImage(this, 0, 0,canvas.width,canvas.height);
	}
	
	img.src =  document.getElementById("canvas").getAttribute("init-path");
}

// event.type должен быть keypress
function getChar(event) {
  if (event.which == null) { // IE
    if (event.keyCode < 32) return null; // спец. символ
    return String.fromCharCode(event.keyCode)
  }

  if (event.which != 0 && event.charCode != 0) { // все кроме IE
    if (event.which < 32) return null; // спец. символ
    return String.fromCharCode(event.which); // остальные
  }

  return null; // спец. символ
}

function showHide(el)
{
	if(el.style.visibility == 'hidden') el.style.visibility = 'visible';
	else el.style.visibility = 'hidden';
	
	if(el.id == 'scale_div') {  
		el.style.border = "";
		glob_x_left_top = canvas.width/2|0;
		glob_y_left_top = canvas.height/2|0;
		redrawPixels_main(document.getElementById("canvas").getContext("2d"), glob_x_left_top , glob_y_left_top );
	
	 }
}



var glob_last_selected_canvas_id = null;

function selectSeed(e)
{
	
		if(e.target.classList.contains("seed-bordered"))
		{
			e.target.classList.toggle("seed-unbordered");
			e.target.classList.toggle("seed-bordered");
			return;
		}
		
		var div = document.getElementById("seed_list");	
		for(var i=0;i<div.childNodes.length;i++)
		{
			if(div.childNodes[i].classList.contains("seed-bordered"))
			{
				div.childNodes[i].classList.toggle("seed-unbordered");
				div.childNodes[i].classList.toggle("seed-bordered");
			}
		}
		
		e.target.classList.toggle("seed-unbordered");
		e.target.classList.toggle("seed-bordered");
		
		glob_last_selected_canvas_id = e.target.id;
		
	
}

window.onload = function()
{
	loadDivFirst( function() {
	
		
		
		//moveDraggableOnOwnPlace();
		
		initModPixels();
	
		//document.getElementById('console_enter').onclick = process_console_text;
		
		filterLoad();
		
		 document.getElementById('canvas').onclick = function(ev) { whenClickedOnCanvas(ev); } 
		
		document.getElementById("filter_div").onclick = whenClickedOnFilter;
		
		
		document.onkeypress = function(ev)
		{
			var ch = '';
			
			if (global_client_typing_mode == false)
			{		
			
			  if (ev.which != 0 && ev.charCode != 0) 
			  { 
				if (ev.which < 32)
				{
					 // спец. символ
					 console.log(ev);
					 return;
				}
				else
				{
					//console.log("ordinary "+String.fromCharCode(ev.which)); // остальные
					
					
					ch = String.fromCharCode(ev.which);
					if (ch == 'i')   { global_client_typing_mode = true; process_console_text(); }
					else if (ch == 's')  { modsld_saveDesktop(); alert('saved'); }
					else if (ch == 'c')  { global_client_typing_mode = true; cripto_script(); }
					else if (ch == 'd')  { global_client_typing_mode = true; decripto_script(); }
					else if (ch == 'r')  { global_client_typing_mode = true; restart_all(); }
					else if (ch == 'f')  { global_client_typing_mode = true; filterShow(); }
					//else if (ch == 'l')  load_desktop_from_local_store();
					else if (ch == 'p')  { global_client_typing_mode = true;print_all(); }
					else if (ch == 'l')  { global_client_typing_mode = true; load_all(); }
					//else if (ch == 'b')  print_buttons();
					else if (ch == 'e')   { 
					
						global_client_typing_mode = true; 
						execute_script(
							function()
							{
								global_client_typing_mode = false;
							}
						); 
					}
					else if (ch == 'h')  help();
						
				}
			  }
			}
			
			//var ch = getChar(e);
			//if(ch == null) return;
			//alert(ch);
			// if(ch == 'p') showHide(document.getElementById("scale_div"));
			// else if(ch == 's') showHide(document.getElementById("seed_list"));
			// else if(ch == 'b') showHide(document.getElementById("buttons_list"));
				
		}
		
		
		
		//drag and drop implementation
		/******
		document.onmousedown = function(e) {

		/*********
		
		  if (e.which != 1) { // если клик правой кнопкой мыши
			return; // то он не запускает перенос
		  }

		  var elem = e.target.closest('.draggable');

		  if (!elem) return; // не нашли, клик вне draggable-объекта

		  // запомнить переносимый объект
		  dragObject.elem = elem;

		  // запомнить координаты, с которых начат перенос объекта
		  dragObject.downX = e.pageX;
		  dragObject.downY = e.pageY;
		  

		  
		  clearSelection();
		  
		  return false;
		  
		}
		
		
		
		document.onmousemove = function(e) {
			
		  if (!dragObject.elem) return; // элемент не зажат

		  if ( !dragObject.avatar ) { // если перенос не начат...

			// посчитать дистанцию, на которую переместился курсор мыши
			var moveX = e.pageX - dragObject.downX;
			var moveY = e.pageY - dragObject.downY;
			if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) {
			  return; // ничего не делать, мышь не передвинулась достаточно далеко
			}

			dragObject.avatar = createAvatar(e); // захватить элемент
			if (!dragObject.avatar) {
			  dragObject = {}; // аватар создать не удалось, отмена переноса
			  return; // возможно, нельзя захватить за эту часть элемента
			}

			// аватар создан успешно
			// создать вспомогательные свойства shiftX/shiftY
			var coords = getCoords(dragObject.avatar);
			dragObject.shiftX = dragObject.downX - coords.left;
			dragObject.shiftY = dragObject.downY - coords.top;

			startDrag(e); // отобразить начало переноса
		  }

		  // отобразить перенос объекта при каждом движении мыши
		  dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
		  dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

		  return false;
		  
		}
		
		
		
		
		document.onmouseup = function(e) {
		  // (1) обработать перенос, если он идет
		  if (dragObject.avatar) {
			finishDrag(e);
		  }

		  // в конце mouseup перенос либо завершился, либо даже не начинался
		  // (2) в любом случае очистим "состояние переноса" dragObject
		  dragObject = {};
		}
		

		********/
		
		/****		
		document.onclick = function (ev) { 
		
			var el = ev.target;
			
			/****
			if(ev.target.id == "console")	{
				el.focus();
				ev.stopPropagation();
				ev.preventDefault();
			}
			****/
			
		//	if(ev.target.tagName=="CANVAS")
		//	{
		//		if(ev.target.id=="canvas") return;
		//		if(ev.target.classList.contains("save-canvas-class")) selectSaveCanvas(ev);
		//		else selectSeed(ev);
		//	}
			
			/*****
			if(isSelectable(el))
			{
				selectSelectableElement(el);
				
			}
			****/
			// clearSelection();
		//};
	
	
		var CLIPBOARD = new CLIPBOARD_CLASS("canvas", true);
		
		document.onselectstart = function(e) {e.preventDefault();return false;}
		
		if (localStorage.getItem("desktop")==null) 
		{
			setInitialButtonsToCanvas();
			setInitialImageToCanvas();
		}
			
		loadDesktop();
		
			document.getElementById('close_attention').onclick = function(){
		fadeOut( document.getElementById('attention'), 50 );
	}
	setTimeout(function(){
		fadeOut( document.getElementById('attention'), 50 );
	},20*1000);
	 //fadeOut( document.getElementById('attention'), 20*1000 );
	
		
		
		/***
		document.addEventListener("contextmenu", function(e)
		{
			if(e.target.id == "canvas")	{
				//alert('test ok');
				
				mod_console_js_showConsole(e);
				document.getElementById("console").focus();
				e.stopPropagation();
				e.preventDefault();
			}
		});
		***/
		
	});

}

function filterLoad(){
document.getElementById("min_red_range").onclick = min_range;
	document.getElementById("max_red_range").onclick = max_range;
	document.getElementById("min_green_range").onclick = min_range;
	document.getElementById("max_green_range").onclick = max_range;
	document.getElementById("min_blue_range").onclick = min_range;
	document.getElementById("max_blue_range").onclick = max_range;
	document.getElementById("min_alpha_range").onclick = min_range;
	document.getElementById("max_alpha_range").onclick = max_range;
	setInputFilterValue(document.getElementById("min_alpha_range"), 255);
document.getElementById("filterButton").onclick = whenClickedOnFilterButton;	
}

function filterShow() {
showHide(document.getElementById("filter_div"));
global_client_typing_mode = false;
}

function reload() 
{
	window.location = '/';
}

function clearSelection() {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else { // старый IE
      document.selection.empty();
    }
  }

  
  function fadeIn( elem, ms )
{
  if( ! elem )
    return;

  elem.style.opacity = 0;
  elem.style.filter = "alpha(opacity=0)";
  elem.style.display = "inline-block";
  elem.style.visibility = "visible";

  if( ms )
  {
    var opacity = 0;
    var timer = setInterval( function() {
      opacity += 50 / ms;
      if( opacity >= 1 )
      {
        clearInterval(timer);
        opacity = 1;
      }
      elem.style.opacity = opacity;
      elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, 50 );
  }
  else
  {
    elem.style.opacity = 1;
    elem.style.filter = "alpha(opacity=1)";
  }
}

function fadeOut( elem, ms )
{
  if( ! elem )
    return;

  if( ms )
  {
    var opacity = 1;
    var timer = setInterval( function() {
      opacity -= 50 / ms;
      if( opacity <= 0 )
      {
        clearInterval(timer);
        opacity = 0;
        elem.style.display = "none";
        elem.style.visibility = "hidden";
      }
      elem.style.opacity = opacity;
      elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, 50 );
  }
  else
  {
    elem.style.opacity = 0;
    elem.style.filter = "alpha(opacity=0)";
    elem.style.display = "none";
    elem.style.visibility = "hidden";
  }
}

function handleClick( evt )
{
  fadeOut( document.getElementById(evt.target.id), 400 );
}


window.onerror = function(message, url, lineNumber) {
	alert (message);
    console.log("Поймана ошибка, выпавшая в глобальную область!\n" + "Сообщение: " + message + "\n(" + url + ":" + lineNumber + ")");
	global_ec_vars_arr = null;
	global_ec_vars_arr_index=null;
	global_ec_vars_arr_length=0;
	global_client_typing_mode = false;
}

