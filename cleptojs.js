function copyToClipboard(elementId) {
  var aux = document.createElement("input");  // Create a "hidden" input
  aux.setAttribute("value", document.getElementById(elementId).innerHTML);  // Assign it the value of the specified element
  document.body.appendChild(aux);// Append it to the body
  aux.select();  // Highlight its content
  document.execCommand("copy");  // Copy the highlighted text
  document.body.removeChild(aux);  // Remove it from the body
}

let buttons = document.querySelectorAll('.clepto_div');
let btn_all = document.querySelectorAll('#but_all');
let btn_sel = document.querySelectorAll('#but_sel');
let btn_no = document.querySelectorAll('#but_no');
let clepto_qty = document.querySelectorAll('.clepto_qty');
let btn_minus10 = document.querySelectorAll('.minus10');
let btn_minus5 = document.querySelectorAll('.minus5');
let btn_minus1 = document.querySelectorAll('.minus1');
let btn_plus1 = document.querySelectorAll('.plus1');
let btn_plus5 = document.querySelectorAll('.plus5');
let btn_plus10 = document.querySelectorAll('.plus10');

arrm = new Map();

function clepto_generate(){
	allstr=""
	arrm.forEach(function(item,i,arr){
		if (item>0){
			desc = document.getElementById('desc_'+i).value;
			desc = desc.replaceAll("\n",'\\n');
			allstr=allstr+i+":"+item+":"+desc.trim()+"\n";
		}
	});
	resd = document.getElementById('clepto_result');
	resd.scrollIntoView(false);
	
	resd.innerHTML=allstr;
	//navigator.clipboard.writeText(allstr);
	
	copyToClipboard('clepto_result');
}

function all_cost(){
	var cost = 0;
	document.querySelectorAll('.clepto_cost').forEach(function(el) {
		rslt = el.textContent*1;
		cost += rslt;
		el.parentNode.parentNode.style.backgroundColor = (rslt>0) ? "#FFFCFC" : "#FFF";
	});
	resd = document.getElementById('total_cost');
	resd.innerHTML=Math.round(cost*100)/100;
}

clepto_qty.forEach((elem)=>{
  elem.addEventListener('keyup',()=>{
	pid = elem.parentNode.parentNode.id;
	if (isNaN(arrm.get(pid))) {arrm.set(pid, 0);}
	arrm.set(pid, Number(elem.value));
	//alert(Number(elem.value) + " " + arrm.get(pid));
	prr = document.getElementById('price_'+pid).innerHTML;
	resd = document.getElementById('cost_'+pid);
	resd.innerHTML= Math.round(prr*arrm.get(pid)*100)/100;
	all_cost();
  })
})

btn_minus10.forEach((elem)=>{
  elem.addEventListener('click',()=>{
	pid = elem.parentNode.parentNode.id;
	if (isNaN(arrm.get(pid))) {arrm.set(pid, 0);}
	arrm.set(pid, arrm.get(pid)-10);
	if (arrm.get(pid)<0) arrm.set(pid,0);
	resd = document.getElementById('qty_'+pid);
	resd.value=arrm.get(pid);
	prr = document.getElementById('price_'+pid).innerHTML;
	resd = document.getElementById('cost_'+pid);
	resd.innerHTML= Math.round(prr*arrm.get(pid)*100)/100;
	all_cost();
  })
})
btn_minus5.forEach((elem)=>{
  elem.addEventListener('click',()=>{
	pid = elem.parentNode.parentNode.id
	if (isNaN(arrm.get(pid))) arrm.set(pid, 0);
	arrm.set(pid, arrm.get(pid)-5);
	if (arrm.get(pid)<0) arrm.set(pid,0);
	resd = document.getElementById('qty_'+pid);
	resd.value=arrm.get(pid);
	prr = document.getElementById('price_'+pid).innerHTML;
	resd = document.getElementById('cost_'+pid);
	resd.innerHTML=Math.round(prr*arrm.get(pid)*100)/100;
	all_cost();
  })
})
btn_minus1.forEach((elem)=>{
  elem.addEventListener('click',()=>{
	pid = elem.parentNode.parentNode.id
	if (isNaN(arrm.get(pid))) arrm.set(pid, 0);
	arrm.set(pid, arrm.get(pid)-1);
	if (arrm.get(pid)<0) arrm.set(pid,0);
	resd = document.getElementById('qty_'+pid);
	resd.value=arrm.get(pid);
	prr = document.getElementById('price_'+pid).innerHTML;
	resd = document.getElementById('cost_'+pid);
	resd.innerHTML=Math.round(prr*arrm.get(pid)*100)/100;
	all_cost();
  })
})

btn_plus1.forEach((elem)=>{
  elem.addEventListener('click',()=>{
	pid = elem.parentNode.parentNode.id
	if (isNaN(arrm.get(pid))) {arrm.set(pid, 0);}
	arrm.set(pid, arrm.get(pid)+1);
	resd = document.getElementById('qty_'+pid);
	resd.value=arrm.get(pid);
	prr = document.getElementById('price_'+pid).innerHTML;
	resd = document.getElementById('cost_'+pid);
	resd.innerHTML=Math.round(prr*arrm.get(pid)*100)/100;
	all_cost();
  })
})
btn_plus5.forEach((elem)=>{
  elem.addEventListener('click',()=>{
	pid = elem.parentNode.parentNode.id
	if (isNaN(arrm.get(pid))) {arrm.set(pid, 0);}
	arrm.set(pid, arrm.get(pid)+5);
	resd = document.getElementById('qty_'+pid);
	resd.value=arrm.get(pid);
	prr = document.getElementById('price_'+pid).innerHTML;
	resd = document.getElementById('cost_'+pid);
	resd.innerHTML=Math.round(prr*arrm.get(pid)*100)/100;
	all_cost();
  })
})
btn_plus10.forEach((elem)=>{
  elem.addEventListener('click',()=>{
	pid = elem.parentNode.parentNode.id
	if (isNaN(arrm.get(pid))) {arrm.set(pid, 0);}
	arrm.set(pid, arrm.get(pid)+10);
	resd = document.getElementById('qty_'+pid);
	resd.value=arrm.get(pid);
	prr = document.getElementById('price_'+pid).innerHTML;
	resd = document.getElementById('cost_'+pid);
	resd.innerHTML=Math.round(prr*arrm.get(pid)*100)/100;
 	all_cost();
 })
})
btn_all.forEach((elem)=>{
	elem.addEventListener('click',()=>{
		let cleptos = document.querySelectorAll('.clepto_div');
		cleptos.forEach(function(el) {
			el.style.display='block';
		});
	})
})
btn_sel.forEach((elem)=>{
	elem.addEventListener('click',()=>{
		let cleptos = document.querySelectorAll('.clepto_div');
		cleptos.forEach(function(el) {
			cost = document.getElementById('qty_'+el.id).textContent*1;
			el.style.display= (cost<1) ? 'none' : 'block';
		});
	})
})
btn_no.forEach((elem)=>{
	elem.addEventListener('click',()=>{
		let cleptos = document.querySelectorAll('.clepto_div');
		cleptos.forEach(function(el) {
			cost = document.getElementById('qty_'+el.id).textContent*1;
			el.style.display= (cost<1) ? 'block' : 'none';
		});
	})
})