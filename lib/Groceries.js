//@HDR@	$Id$
//@HDR@		Copyright 2024 by
//@HDR@		Christopher Caldwell/Brightsands
//@HDR@		P.O. Box 401, Bailey Island, ME 04003
//@HDR@		All Rights Reserved
//@HDR@
//@HDR@	This software comprises unpublished confidential information
//@HDR@	of Brightsands and may not be used, copied or made available
//@HDR@	to anyone, except in accordance with the license under which
//@HDR@	it is furnished.
//  Developed by Philip Hutchison, August 2007. 
//  An explanation for this example (and more examples) can be found
//  at http://pipwerks.com/lab/
//  Modified to be more moduler 02/05/11 c.m.caldwell@alumni.unh.edu.

var arrow_list;

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function iePrompt( str, defval )
    {
    var res = window.showModalDialog("ieprompt.html", str,
	"dialogWidth: 290px;"	+
	"dialogHeight: 160px;"	+
	"center: yes;"		+
	"edge: raised;"		+
	"scroll: no;"		+
	"status: no;" );
    return ( res == "" ? defval : res );
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
var usprompt_return;
function usprompt(str,defval)
    {
    var err;
    var ua = navigator.userAgent;
    usprompt_return = "{unset}";
    try	{
	if( window.showModalDialog		&&
	    ( ua.indexOf("MSIE")		>= 0
	     || ua.indexOf("AppleWebKit")	>= 0
	     || ua.indexOf("Safari")	>= 0 )	)
	    {
	    alert("ieprompt logic...");
	    usprompt_return = iePrompt( str, defval );
	    }
	else
	    {
	    alert("Regular prompt logic...");
	    usprompt_return = window.prompt( str, defval );
	    }
	}
    catch (err)
	{ 
	alert("prompt had a problem:  "+err.description);
	usprompt_return = false;
	} 
    if( usprompt_return==false || usprompt_return==null ) { usprompt_return = window.prompt("Try again:  "+str,defval); }
    alert("prompt returning ["+usprompt_return+"]");
    return usprompt_return;
    }

var menu =
[
{	Where:[{name:"Produce"}],	Name:"Onion" },
{	Where:[{name:"Produce"}],	Name:"Granny Smith Apples" },
{	Where:[{name:"Produce"}],	Name:"Mcintosh Apples" },
{	Where:[{name:"Produce"}],	Name:"Bananas" },
{	Where:[{name:"Produce"}],	Name:"Fruit for Jacque" },
{	Where:[{name:"Produce"}],	Name:"Tofu" },
{	Where:[{name:"Produce"}],	Name:"Ginger" },
{	Where:[{name:"Produce"}],	Name:"Dried apricot" },
{	Where:[{name:"Produce"}],	Name:"Tortellini stuffed with chicken" },
{	Where:[{name:"Produce"}],	Name:"Ravioli" },
{	Where:[{name:"2"}],		Name:"Ibuprofin" },
{	Where:[{name:"2"}],		Name:"Antacid" },
{	Where:[{name:"2"}],		Name:"Crest gel toothpaste" },
{	Where:[{name:"3"}],		Name:"Splenda" },
{	Where:[{name:"3"}],		Name:"15 ounce cans red kidney beans" },
{	Where:[{name:"3"}],		Name:"Can of whole corn kernels" },
{	Where:[{name:"4"}],		Name:"Pre-made pizza crust" },
{	Where:[{name:"4"}],		Name:"Spaghetti" },
{	Where:[{name:"4"}],		Name:"Manicotti" },
{	Where:[{name:"4"}],		Name:"14 ounce can whole tomatoes" },
{	Where:[{name:"4"}],		Name:"Spaghetti sauce" },
{	Where:[{name:"4"}],		Name:"Alfredo sauce" },
{	Where:[{name:"4"}],		Name:"Can of tomato sauce" },
{	Where:[{name:"5"}],		Name:"Soups" },
{	Where:[{name:"5"}],		Name:"Beefaroni/Beefagetti" },
{	Where:[{name:"5"}],		Name:"Rice" },
{	Where:[{name:"5"}],		Name:"Hollandaise sauce" },
{	Where:[{name:"6"}],		Name:"Peanut butter" },
{	Where:[{name:"6"}],		Name:"Diet cranberry juice" },
{	Where:[{name:"7"}],		Name:"Adirondaks lime water" },
{	Where:[{name:"7"}],		Name:"Adirondaks strawberry water" },
{	Where:[{name:"8"}],		Name:"Chris' cereal" },
{	Where:[{name:"8"}],		Name:"Jacque's cereal" },
{	Where:[{name:"8"}],		Name:"Honey" },
{	Where:[{name:"9"}],		Name:"Fresca" },
{	Where:[{name:"9"}],		Name:"Lime Diet Coke" },
{	Where:[{name:"9"}],		Name:"Diet Decaf Coke" },
{	Where:[{name:"9"}],		Name:"Lemon Splenda Coke" },
{	Where:[{name:"9"}],		Name:"Sandwich Thins/Flats" },
{	Where:[{name:"9"}],		Name:"Whole wheat sliced bread" },
{	Where:[{name:"9"}],		Name:"English muffins" },
{	Where:[{name:"9"}],		Name:"Hot dog rolls" },
{	Where:[{name:"11"}],		Name:"Tide (high efficiency)" },
{	Where:[{name:"11"}],		Name:"Fabric Softener" },
{	Where:[{name:"11"}],		Name:"Dishwasher detergent" },
{	Where:[{name:"11"}],		Name:"Garbage bags" },
{	Where:[{name:"12"}],		Name:"Dog food" },
{	Where:[{name:"12"}],		Name:"Dog treats" },
{	Where:[{name:"12"}],		Name:"Toilet tissue" },
{	Where:[{name:"13"}],		Name:"Paper towels" },
{	Where:[{name:"13"}],		Name:"Lasagna" },
{	Where:[{name:"13"}],		Name:"Frozen dinners" },
{	Where:[{name:"13"}],		Name:"Chicken Cordon Bleu dumplings" },
{	Where:[{name:"13"}],		Name:"“Slim Cow” ice cream (chocolate, vanilla, cookies 'n cream)" },
{	Where:[{name:"14"}],		Name:"Shredded mozzarella cheese" },
{	Where:[{name:"14"}],		Name:"15oz low fat ricotta cheese" },
{	Where:[{name:"14"}],		Name:"Egg substitute" },
{	Where:[{name:"14"}],		Name:"Greek yogurt of varying flavors" },
{	Where:[{name:"14"}],		Name:"Organic plain whole milk yogurt" },
{	Where:[{name:"Dairy"}],		Name:"Soy milk" },
{	Where:[{name:"Dairy"}],		Name:"½ gallon 1% milk" },
{	Where:[{name:"Dairy"}],		Name:"Fat free half & half" },
{	Where:[{name:"Dairy"}],		Name:"Coffee Mate Italian Sweet Cream" },
{	Where:[{name:"Dairy"}],		Name:"Large Grade A eggs" },
{	Where:[{name:"Meats"}],		Name:"Hot dogs" },
{	Where:[{name:"Meats"}],		Name:"1 lb turkey burger" },
{	Where:[{name:"Meats"}],		Name:"4 * 4oz boneless, skinless chicken breast halves" },
{	Where:[{name:"Home Depot"}],	Name:"Bag of Morton's Salt for water filter" }
]

var item_to_filename = %%ITEM_TO_FILENAME%%;

var stores = [ "Hannafords of Brunswick ME", "Hannafords of Topsham ME" ];
var new_store = 0;
var wheres = new Array();
var list = new Array();
var tableidptr;
var add_qty = 1;
var add_item = "";
var search_str = "";

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function change_quantity( ind, ptr )
    {
    var oldval = ( ind < 0 ? add_qty : list.items[ind].quantity );
    var val = ( ptr ? ptr.value : 0 );
    if( ind >= 0 )
	{
        if( val > 0 )
	    {
	    list.items[ind].quantity = val;
	    }
	else
	    {
	    while( ++ind < list.items.length )
	        {
		list.items[ind-1] = list.items[ind];
		}
	    list.items.length--;
	    }
	}
    else
        {
	add_qty = val;
	}
    draw_list();
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function change_where( menuind, ptr )
    {
    if( ! menu[menuind].Where ) { menu[menuind].Where = new Array(); }
    if( ! menu[menuind].Where[list.store] ) { menu[menuind].Where[list.store] = new Array(); }
    menu[menuind].Where[list.store].name = ptr.value;
    setup_store();
    draw_list();
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function menu_lookup( type )
    {
    for( var menu_ind=0; menu_ind<menu.length; menu_ind++ )
        {
	if( menu[menu_ind].Name == type )
	    { return menu_ind; }
	}
    return -1;
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function add_item_fnc( menu_ind )
    {
    var lind = list.items.length++;
    list.items[lind] = { type:menu[menu_ind].Name, quantity:add_qty };
    add_qty = 1;
    add_item = 0;
    setup_store();
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function stuff_in_add_input()
    {
    if( add_item )
	{
	var menuind = menu_lookup( add_item );
	if( menuind < 0 )
	    {
	    menuind = menu.length++;
	    menu[menuind] = { Name:add_item };
	    }
	add_item_fnc( menuind );
	add_item = "";
	search_str = "";
	return 1;
	}
    return 0;
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function tick()
    {
    if( stuff_in_add_input() )
        { draw_list(); }
    setTimeout( tick, 1000 );

    if( navigator.geolocation )
	{
	var options =
	    {
	    enableHighAccuracy:	true,
	    timeout:		5000,
	    maximumAge:		0
	    };
	navigator.geolocation.getCurrentPosition( igeo_success, geo_failure, options );
	}
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function set_item( flag, ptr )
    {
    if( ptr.value )
	{ add_item = ptr.value; }
    else
	{ add_item = ptr; }

    if( flag == 0 )
	{
	// setTimeout( tick, 1000 );
	}
    else
	{
	if( stuff_in_add_input() )
	    { draw_list(); }
	}
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
var last_coord = -2;
var last_heading = 0;
var menu_index;
function geo_success( position )
    {
    last_coord = position.coords;

    if( menu_index >= 0 )
        {
	menu[menu_index].Where[list.store].Latitude = position.coords.latitude;
	menu[menu_index].Where[list.store].Longitude = position.coords.longitude;
	alert("XL(Updating) " + menu[menu_index].Name
	   +"\nPlace name:  "   + menu[menu_index].Where[list.store].name
	   +"\nLatitude:    "   + menu[menu_index].Where[list.store].Latitude
	   +"\nLongitude:   "   + menu[menu_index].Where[list.store].Longitude);
	}

    update_arrows();
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function geo_failure(err)
    {
    // alert("Something went wrong:  "+err.code+"("+err.message+")");
    last_coord = -1;
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function set_found( geo_ind, chkptr )
    {
    list.items[geo_ind].found = ( chkptr.checked ? 1 : 0 );
    if( list.items[geo_ind].found )
        {
	menu_index = menu_lookup( list.items[geo_ind].type );
	if( ! menu[menu_index].Where )
	    { menu[menu_index].Where = new Array(); }
	if( ! menu[menu_index].Where[list.store] )
	    { menu[menu_index].Where[list.store] = new Array(); }
//	menu[menu_index].Where[list.store].name =
//	    usprompt("XL(Where)",
//	        ( menu[menu_index].Where[list.store].name
//		? menu[menu_index].Where[list.store].name
//		: "" ) );
	setup_store();
	if( navigator.geolocation )
	    {
	    var options =
		{
		enableHighAccuracy:	true,
		timeout:		5000,
		maximumAge:		0
		};
	    navigator.geolocation.getCurrentPosition( geo_success, geo_failure, options );
	    }
	}
    draw_list();
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function igeo_success( position )
    {
    last_coord = position.coords;
    update_arrows();
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function set_store( ptr )
    {
    if( ptr.options )
	{
	for( var i=0; i<ptr.options.length; i++ )
	    {
	    if( ptr.options[i].selected )
		{
		if( ptr.options[i].value == "Other" )
		    { new_store = stores.length; }
		else
		    {
		    new_store = ptr.options[i].value;
		    list.store = new_store;
		    }
		}
	    }
	}
    else
        {
	new_store = stores.length;
	list.store = new_store;
	stores.push( ptr.value );
	}
    setup_store();
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function fix_quote( s )
    {
    return s.replace( "'", "&#39;", 'gm' );
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function show_search( search_str )
    {
    var patt = new RegExp( search_str, "i" );
    var s = "";

    var ctr=0;
    for( var menu_ind=0; menu_ind<menu.length && ctr<10; menu_ind++ )
	{
	if( patt.test( menu[menu_ind].Name ) )
	    {
	    s += "<br><a href='javascript:set_item(1,&quot;" + fix_quote( menu[menu_ind].Name ) + "&quot;);'>" + menu[menu_ind].Name + "</a>";
	    ctr++;
	    }
	}
    (window.document.getElementById("textspan")).innerHTML = s;
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function keypressed( ptr )
    {
    if( typeof(ptr.value) != "undefined" )
        { search_str = ptr.value; }
    else
        { search_str = ptr; }

    if( search_str ) { show_search( search_str ); }
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function ang_to_arrow( ang )
    {
    if( ang < 0 ) { ang += 360; }

    if( ang>=338 || ang<22 )	{ return "&#8657;"; }
    else if( ang < 67 )		{ return "&#8663;"; }
    else if( ang < 112 )	{ return "&#8658;"; }
    else if( ang < 157 )	{ return "&#8664;"; }
    else if( ang < 202 )	{ return "&#8659;"; }
    else if( ang < 247 )	{ return "&#8665;"; }
    else if( ang < 292 )	{ return "&#8656;"; }
    else if( ang < 337 )	{ return "&#8662;"; }
    return "?";
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function acalc( tp, Store )
    {
    var c0 = "&nbsp;";
    var c1 = "?";

    // alert("acalc("+tp+","+Store+")");
    if( last_coord && last_coord.latitude	&&
	menu[tp].Where[Store].Latitude	&&
	menu[tp].Where[Store].Longitude	)
	{
	var ang = 0;
	var lat_dif	= last_coord.latitude
			- menu[tp].Where[Store].Latitude;
	var lon_dif	= last_coord.longitude
			- menu[tp].Where[Store].Longitude;

	var ang = 180 * Math.atan( lat_dif / lon_dif ) / 3.14159;

	var nang = ang - last_heading;
	while( nang < 0 ) { nang += 360.0; }
	while( nang > 360 ) { nang -= 360.0; }

	c1 = "<a href='javascript:alert(&quot;"+
	    menu[tp].Where[Store].Latitude + "," +
	    menu[tp].Where[Store].Longitude + " vs " +
	    last_coord.latitude + "," +
	    last_coord.longitude +
	    " lat_dif=" + lat_dif +
	    " lon_dif=" + lon_dif +
	    " ang="+ang +
	    " last_heading="+last_heading +
	    " nang="+nang +
	    "&quot;)'>" +
	    ang_to_arrow(nang) + "</a>";
	}
    return c1;
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function update_arrows()
    {
    var p;
    var ind;
    for( ind=0; ind<arrow_list.length; ind++ )
	{
	var arrow_info = arrow_list[ind];
	var tp = arrow_info.tp;
	var Store = arrow_info.Store;
	var sid = arrow_info.sid;
	
	p = window.document.getElementById(sid);

	p.innerHTML = acalc( tp, Store );
	}

    p = window.document.getElementById("heading_but");
    if( p ) { p.value = last_heading; }
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function draw_list()
    {
    arrow_list = new Array();
    var s = "<table border=0><tr><th colspan=4>";
    s += "<select onChange='set_store(this);' help='select_store'>";
    s += "<option value='-1' help='option_menu_edit'";
    if( new_store==-1 ) { s += " selected"; }
    s += ">XL(Menu edit)";
    for( var i=0; i<stores.length; i++ )
        {
	if( stores[i] )
	    {
	    s += "<option value='"+i+"'";
	    if( i == new_store ) { s += " selected"; }
	    s += ">" + stores[i];
	    }
	}
    if( new_store < stores.length )
        { s += "<option value='Other'>XL(Add store)</select>"; }
    else
        {
	s += "<option value='Other' selected>XL(Add store)</select>"
	  +  "<br><input type=name placeholder='XL(Store name)'"
	  +  " onChange='set_store(this);'>";
	}
    s += "</th></tr>";

    if( new_store != -1 )
	{ s += gen_list(); }
    else
	{ s += gen_menu(); }
    tableidptr.innerHTML = s;
    // (s.replace("XL{","","gm")).replace("}","","gm");
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function gen_list()
    {
    var s = "";
    s += "<tr><th>XL{Quantity}</th>";
    s += "<th>XL{Where}</th>";
    s += "<th>XL{Name}</th>";
    s += "<th>XL{Found}</th>";
    s += "</tr>";
    var nwheres = wheres.sort( function fun(a,b) { return wherecmp(a,b); } );
    for( const found_state of [ false, true ] )
	{
	// s += "<tr><th colspan=4>found_state=["+found_state+"]</th></tr>\n";
	for( var where_ind=0; where_ind<nwheres.length; where_ind++ )
	    {
	    for( var list_ind=0; list_ind<list.items.length; list_ind++ )
		{
		var tp = menu_lookup(list.items[list_ind].type);
		if( tp < 0 ) { continue; }
		var where = menu[tp].Where[list.store].name;
		if( typeof(where) == "undefined" ) { where = ""; }
		// s += "<tr><th colspan=4>list_ind=["+list_ind+"] where=["+where_ind+"] nwheres=["+nwheres[where_ind]+"]</th></tr>\n";
		//alert("Comparing nwheres["+where_ind+"]("+nwheres[where_ind]+") with ["+where+"]"
		//+ ", found_state="+found_state+", list.items["+list_ind+"].found="+(list.items[list_ind].found||false) );
		if( (where == nwheres[where_ind]) && (found_state == (list.items[list_ind].found||false) ) )
		    {
		    // s += "<tr><th colspan=4>list_ind=["+list_ind+"] ["+(list.items[list_ind].found||"UNDEF")+"]</th></tr>\n";
		    s +=	( list.items[list_ind].found
			    ? "<tr>"
			    : "<tr bgcolor='#80f0f0'>"
			    );
		    s += "<td><input type=text help='input_quantity' value='"+list.items[list_ind].quantity+"' size=2"
			+ " placeholder='XL{Quantity}'"
			+ " onChange='change_quantity("+list_ind+",this);'>";
		    s += "<a help='button_remove' href='javascript:change_quantity("+list_ind+",0);'>X</a>";
		    s += "</td>";
		    s += "<td><input type=text help='input_where' value='"+where+"' size=7"
			+ " placeholder='XL{Where in store}'"
			+ " onChange='change_where("+tp+",this);'></td>";
			// + " onChange='menu["+tp+"].Where[list.store].name=this.value;draw_list();'></td>";
		    // " + where + "</td>";
		    s += "<td help='input_item_name'>";
		    if( menu[tp].File )
			{ s += '<a target=_blank href="%%WEB%%/'+menu[tp].File+'">'; }
		    s += menu[tp].Name;
		    if( menu[tp].File )
			{ s += "</a>"; }
		    s += "</td><th>";
		    s += "<input type=checkbox help='input_found' onClick='set_found("+list_ind+",this);'";
		    if( list.items[list_ind].found ) { s += " checked"; }
		    s += ">";

		    var sid = "ar_" + tp + "_" + list.store;

		    var arrow_info = { tp:tp, Store:list.store, sid:sid };
		    arrow_list.push( arrow_info );
		    s += "<span id="+sid+"></span>";

		    s += "</th></tr>";
		    }
		}
	    }
	}
    for( var list_ind=0; list_ind<list.items.length; list_ind++ )
	{
	var tp = menu_lookup(list.items[list_ind].type);
	if( tp < 0 )
	    {
	    s +=	( list.items[list_ind].found
			? "<tr>"
			: "<tr bgcolor='#80f0f0'>"
			);
	    s += "<td><input type=text help='input_quantity' value='"+list.items[list_ind].quantity+"' size=5"
		+ " placeholder='XL{Quantity}'"
		+ " onChange='change_quantity("+list_ind+",this);'>";
		    s += "<a href='javascript:change_quantity("+list_ind+",0);'>X</a>";
	    s += "</td><td></td>";
	    // s += "<td>XL{Other}</td>";
	    s += "<td>"+list.items[list_ind].type+"</td>";
	    s += "<th><input type=checkbox help='input_found' onClick='set_found("+list_ind+",this);'";
	    if( list.items[list_ind].found )
		{ s += " checked"; }
	    s += "></th>";
	    s += "</tr>";
	    }
	}
    s += "<tr><td><input type=text help='input_quantity' value='"+add_qty+"' size=5"
	+ " placeholder='XL{Quantity}'"
	+ " onChange='change_quantity(-1,this);'></td>";
    s += "<td></td><td>";
    s += "<input type=text"
      +  " help='input_item_name'"
      +  " placeholder='XL{Item}'"
      +  " onChange='set_item(0,this);' onkeyup='keypressed(this);'>";
    s += "<span id=textspan></span>";
    //s += "</td><th><input type=button onClick='update_arrows();' value='XL(Update)'></th></tr>";
    s += "</td><th><input type=button help='button_redraw' onClick='draw_list();' id=heading_but value='"+last_heading+"'></th></tr>";
    s += "<tr><th>";
    s += "<input type=button help='button_save_list' value='XL(Save)' onClick='save_lists();'>";
    s += "</th><th colspan=2><input type=text help='input_store_name'"
    s += " placeholder='XL{List name (REQUIRED)}' value='";
    s += window.document.%%FORMNAME%%.listname.value;
    s += "' onChange='window.document.%%FORMNAME%%.listname.value=this.value;'";
    s += "></th><th>";
    s += "<input type=button help='button_clear_list' value='XL(Clear)' onClick='init_list();'>";
    s += "</th></tr></table>";
    return s;
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function delete_from_menu( ind )
    {
    menu[ind] = menu[menu.length-1];
    // delete menu[menu.length-1];
    delete menu[menu.length-1];
    menu.length--;
    draw_list();
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function fixednum( s, n )
    {
    while( s.length < n )
	{ s = "0" + s; }
    return s;
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function prepare_string( s0 )
    {
    var s1 = (s0+"").replace( /\d\d*/g,
	function myfunction(x) { return fixednum(x,20); } );
    return s1.toLowerCase();
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function wherecmp( w1, w2 )
    {
    w1 = prepare_string( w1 );
    w2 = prepare_string( w2 );
    var res = w1.localeCompare(w2);
    // alert("Comparing ["+w1+"] and ["+w2+"]:"+res);
    return res;
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function namecmp( n1, n2 )
    {
    if( ! n1.fixedWhere ) { n1.fixedWhere = prepare_string(n1.Where); }
    if( ! n2.fixedWhere ) { n2.fixedWhere = prepare_string(n2.Where); }
    alert("Comparing ["+n1.fixedWhere+"] and ["+n1.fixedWhere+"]");
    return n1.fixedWhere.localeCompare(n2.fixedWhere);
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function gen_menu()
    {
    var s = "<table border=0><tr><th>XL{Delete}</th><th>XL{Found}</th><th>XL{Item}</th></tr>";
    menu = menu.sort( function(a,b) { return a.Name.localeCompare(b.Name); } );
    for( var menu_ind=0; menu_ind<menu.length; menu_ind++ )
	{
	s += "<tr><td>";
	s += "<input type=button help='button_delete_menu_item' onClick='delete_from_menu("+menu_ind+");'>";
	s += "</td><td help='menu_item_seen'>";
	if( menu[menu_ind].Where ) { s += "Seen"; }
	s += "</td><td help='menu_item_name'>";
	if( menu[menu_ind].File )
	    { s += '<a target=_blank href="%%WEB%%/'+menu[menu_ind].File+'">'; }
	s += menu[menu_ind].Name;
	if( menu[menu_ind].File ) { s += "</a>"; }
	}
    s += "<tr><th>";
    s += "<input type=button value='XL(Save)' onClick='save_lists();'>";
    s += "</th></tr></table>";
    return s;
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function init_list()
    {
    if( confirm("XL(Clear list?)") )
	{
	list = new Array();
	wheres = new Array();
	list.items = new Array();
	add_qty = 1;
	draw_list();
	}
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function obj_to_str( obj, lvl )
    {
    var s = "";
    if( typeof(lvl) == "undefined" ) { lvl=0; }
    var cnt = lvl;
    var spc = "";
    while( cnt-- > 0 ) { spc += " "; }

    var need_sep = "";
    var ind = 0;
    var is_array = 1;
    for( v in obj )
        {
	if( v != ind ) { is_array = 0; }
	ind++;
	}

    for( v in obj )
        {
	s += need_sep;
	if( ! is_array )
	    {
	    s += spc;
	    if( /^[A-Za-z_][A-Za-z0-9_]*$/.test(v)
	     || /^[1-9]\d*$/.test(v)
	     || v == "0" )
		{ s += v; }
	    else
		{ s += '"' + v + '"'; }
	    s += ":";
	    }
	if( typeof( obj[v] ) == "object" )
	    { s += obj_to_str( obj[v], lvl+1 ); }
	else
	    {
	    if( is_array ) { s += spc; }
	    if( /^[1-9]\d*$/.test(obj[v]) || obj[v] == "0" )
	        { s += obj[v]; }
	    else
		{ s += '"' + obj[v] + '"'; }
	    }
	need_sep = ",\n";
	ind++;
	}
    if( is_array )
        { s = "\n" + spc + "[\n" + s + "\n" + spc +"]"; }
    else
        { s = "\n" + spc + "{\n" + s + "\n" + spc +"}"; }
    return s;
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function save_list( varname, obj )
    {
    window.document.%%FORMNAME%%[varname].value = obj_to_str( obj, 0 );
    // alert("Setting "+varname+" to [" + window.document.%%FORMNAME%%[varname].value + "]" );
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function restore_list( varname, maxlen, defval )
    {
    var res;
    var val = window.document.%%FORMNAME%%[varname].value;
    if( val.length <= maxlen )
        { res = defval; }
    else
	{
	eval( "res = " + val + ";" );
	}
    return res;
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function save_lists()
    {
    if( search_str != "" )
        {
	add_item = search_str;
	stuff_in_add_input();
	}
    save_list( "menu", menu );
    save_list( "list", list );
    save_list( "stores", stores );
    window.document.%%FORMNAME%%.submit();
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function setup_store()
    {
    var seen_where = new Array();

    wheres = new Array();

    for( var i=0; i<menu.length; i++ )
        {
	if( !menu[i].Where ) { menu[i].Where = new Array(); }
	if( !menu[i].Where[list.store] ) { menu[i].Where[list.store] = new Array(); }
	var where = menu[i].Where[list.store].name;
	if( typeof(where) == "undefined" ) { where = ""; }
	if( ! seen_where[ where ] )
	    {
	    seen_where[ where ] = 1;
	    wheres.push( where );
	    }
	}
    draw_list();
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function orientationChanged(event)
    {
    if( ! event )
        {
	// alert("Event not defined.");
	}
    else
        {
	last_heading = event.webkitCompassHeading + window.orientation;
	}
    }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function setup()
    {
    tableidptr = window.document.getElementById("tableid");

    if( 1 )
	{
	stores = restore_list("stores",7,stores);
	menu = restore_list("menu",7,menu);
	list = restore_list("list",7,list);
	if( ! list.items )
	    {
	    var nlist = new Array();
	    nlist.items = list;
	    nlist.store = 0;
	    list = nlist;
	    }
	}
    else
	{
	list = new Array();
	list.items = new Array();
	}

    if( list.store ) { new_store = list.store; }

    for( var o in item_to_filename )
        {
	var ind = menu_lookup( o );
	if( ind >= 0 && !menu[ind].File )
	    {
	    menu[ind].File = item_to_filename[o];
	    }
	}

    setup_store();
    tick();
    window.addEventListener(
        'deviceorientation',
	    function (e) { orientationChanged(e); },
	    false);
    }
