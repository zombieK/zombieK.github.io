
function jsonp(json){
    var json=json || {};
    if(!json.url)return;
    json.data=json.data || {};
    json.cbName=json.cbName || 'cb';

    var fnName='jsonp_'+Math.random();
    fnName=fnName.replace('.', '');
    window[fnName]=function(aa){
        json.success && json.success(aa);
        oHead.removeChild(oS);
    };

    json.data[json.cbName]=fnName;
    var arr=[];
    for(var name in json.data){
        arr.push(name+'='+json.data[name]);
    }
    var str=arr.join('&');

    var oS=document.createElement('script');
    oS.src=json.url+'?'+str;
    var oHead=document.getElementsByTagName('head')[0];
    oHead.appendChild(oS);
}