#!/usr/bin/perl -w
#@HDR@	$Id: app.cgi,v 1.1 2020/08/12 21:14:10 chris Exp chris $
#@HDR@		Copyright 2020-2024 by
#@HDR@		Christopher Caldwell/Brightsands
#@HDR@		P.O. Box 401, Bailey Island, ME 04003
#@HDR@		All Rights Reserved
#@HDR@
#@HDR@	This software comprises unpublished confidential information
#@HDR@	of Brightsands and may not be used, copied or made available
#@HDR@	to anyone, except in accordance with the license under which
#@HDR@	it is furnished.

use strict;
use MIME::Lite;
use lib "/usr/local/lib/perl";
use COMMON;

#$COMMON::TABLE_TAGS	= "bgcolor=\"#c0c0d0\"";
$COMMON::TABLE_TAGS	= "USECSS";

#package main;
#our $FORMNAME		= "form";
#do "common.pl";

package main;

my $FORMNAME = "form";

&COMMON::setup(
	allow_account_creation=>0,
	require_valid_email=>1,
	require_valid_address=>1,
	preset_language=>"en",
	Qrequire_captcha=>1
	);

#########################################################################
#	Variable declarations.						#
#########################################################################

our $AGENT		= $ENV{HTTP_USER_AGENT};

our $form_top;

my $SENDMAIL = "/usr/lib/sendmail";
my $HELP_DIR = "$COMMON::BASEDIR/help";

#########################################################################
#	Return true if the first item appears in the remaining list.	#
#########################################################################
sub inlist
    {
    my( $item, @list ) = @_;
    return grep( $_ eq $item, @list );
    }

#########################################################################
#	Used by the common administrative functions.			#
#########################################################################
sub footer
    {
    my( $mode ) = @_;

    $mode = "admin" if( !defined($mode) );

    my $s = <<EOF;
<script>
function footerfunc( fnc )
    {
    with( window.document.footerform )
	{
	func.value = fnc;
	submit();
	}
    }
</script>
<form name=footerform method=post>
<input type=hidden name=func>
<input type=hidden name=SID value="$COMMON::SID">
<input type=hidden name=USER value="$COMMON::USER">
EOF
    $s .= <<EOF;
    <center><table $COMMON::TABLE_TAGS border=1>
    <tr><th><table $COMMON::TABLE_TAGS><tr><th
EOF
    foreach my $button (
	"dirmode:XL(Directory)",
	"admin:XL(Account administration)" )
        {
	my( $butdest, $buttext ) = split(/:/,$button);
	$s .= "><input type=button help='button_$butdest'" .
	    " onClick='footerfunc(\"$butdest\");'" .
	    ( ($butdest eq $mode) ? " style='background-color:cyan'" : "" ) .
	    " value=\"$buttext\"\n";
	}
    $s .= ">" . &COMMON::logout_select() . <<EOF;
	</th></tr>
	</table></th></tr></table></center></form>
EOF
    &COMMON::xprint( $s );
    }

#########################################################################
#	Return true if we need to print content header.			#
#########################################################################
sub check_if_app_needs_header()
    {
    return ! &inlist(($COMMON::FORM{func}||""),"download","view");
    }

#########################################################################
#	Display list of all the lists.					#
#########################################################################
sub directory_screen
    {
    my $s = $form_top;
    my @lists = &COMMON::dbget( $COMMON::DB, "lists" );
    $s .= <<EOF;
<input type=hidden name=listind value="">
<center><table border=1>
<tr><th>XL(Select)</th><th>XL(List name)</th><th>XL(Last modified)</th></tr>
EOF
    foreach my $listind ( @lists )
        {
	$s .= "<tr><th><input type=button help='button_select_list' onClick='submit_func(\"show\",\"$listind\");'></th><td>"
	    . &COMMON::dbget($COMMON::DB,"list",$listind,"name")
	    . "</td><td>"
	    . &COMMON::dbget($COMMON::DB,"list",$listind,"modified")
	    . " XL(by) "
	    . &COMMON::dbget($COMMON::DB,"list",$listind,"modifier")
	    . "</td></tr>";
	}
    $s .= <<EOF;
<tr><th colspan=3><input type=button help='button_add_list' onClick='submit_func(\"show\",\"\");' value="XL(Create new list)"></th></tr>
</table></center></form>
EOF
    $s =~ s+%%JSCRIPT%%++gs;
    &COMMON::xprint( $s );
    &footer("directory");
    }

#########################################################################
#	Create some e-mail.						#
#########################################################################
sub generate_email
    {
    my( $dest ) = @_;

    my $s = $form_top;

    &COMMON::dbread( $COMMON::DB ) if( $dest );

    my @table_entries = ();
    my @lists = &COMMON::dbget( $COMMON::DB, "lists" );
    foreach my $listind ( @lists )
        {
	my @items = ();
        my $list = ( &COMMON::dbget( $COMMON::DB, "list", $listind, "data" ) || "" );
	foreach my $itempiece ( split(/type:/,$list) )
	    {
	    if( $itempiece =~ /"(.*)".*quantity:(\d+)/s )
		{
		push( @items, "<td align=right>$2</td><td>$1</td>" );
		}
	    }
	next if( ! @items );
	push( @table_entries,
	    "<td colspan=2>&nbsp;<p><b>"
		. &COMMON::dbget($COMMON::DB,"list",$listind,"name")
		. "</b> XL(modified) "
		. &COMMON::dbget($COMMON::DB,"list",$listind,"modified")
		. " XL(by) "
		. &COMMON::dbget($COMMON::DB,"list",$listind,"modifier")
		. "</th>",
	    "<th align=right>Quantity</th><th align=left>Items</th>",
	    @items);
	}
    if( ! $COMMON::URL )
	{
	$COMMON::PROG = $0;
	$COMMON::PROG=~ s+^.*/++;
	$COMMON::PROG = "Groceries.cgi" if( $COMMON::PROG eq "app.cgi" );
	$COMMON::URL = "http://www.brightsands.com/~chris/$COMMON::PROG";
	}

    $s .= <<EOF
<center><table border=1><tr>
EOF
    . join("</tr>\n<tr>",@table_entries) . "</tr></table>"
    . "<a href=$COMMON::URL>Application</a></center>\n";
    if( ! $dest )
	{
	&COMMON::xprint( $s );
	&footer("directory");
	}
    else
        {
	if( ! @table_entries )
	    {
	    print "No appropriate items in any grocery list.\n";
	    }
	else
	    {
	    my $mime_msg = MIME::Lite->new
		(
		From	=> "groceries\@www.brightsands.com",
		To		=> $dest,
		Subject	=> "Grocery lists",
		Type	=> "Multipart/mixed"
		) || die("Cannot setup mime:  $!");

	    $s =~ s/XL\((.*?)\)/$1/gs;

	    $mime_msg->attach
		(
		Type	=> "text/html",
		Data	=> "<html><head></head><body>$s</body></html>"
		) || die("Cannot attach to mime message:  $!");

	    open( OUT, "| $SENDMAIL -t 2>&1" )
		|| die("Cannot run $SENDMAIL:  $!");
	    print OUT $mime_msg->as_string;
	    close( OUT );
	    }
	}
    &COMMON::cleanup(0);
    }

#########################################################################
#	Turn a filename into the probable menu item name.		#
#########################################################################
sub filename_to_item
    {
    my( $fn ) = @_;
    $fn =~ s+.*/++;
    $fn =~ s+\.jpg$++;
    $fn =~ s/_/ /g;
    return $fn;
    }

#########################################################################
#	Default screen							#
#########################################################################
sub show_list
    {
    my $s = $form_top;
    my $jscript=&read_file("$COMMON::BASEDIR/lib/$COMMON::PROG.js");

    my $menu = ( &COMMON::dbget( $COMMON::DB, "menu" ) || "" );
    my $list = ( &COMMON::dbget( $COMMON::DB, "list", $COMMON::FORM{listind}, "data" ) || "" );
    my $stores = ( &COMMON::dbget( $COMMON::DB, "stores" ) || "" );
    my $listname = ( &COMMON::dbget( $COMMON::DB, "list", $COMMON::FORM{listind}, "name" ) || "" );

    print STDERR "CMC 0 menu=[$menu]\n";
    print STDERR "CMC 0 list=[$list]\n";
    print STDERR "CMC 0 stores=[$stores]\n";

    $menu = &COMMON::javascript_esc( $menu, '"', "&quot;" );
    $list = &COMMON::javascript_esc( $list, '"', "&quot;" );
    $stores = &COMMON::javascript_esc( $stores, '"', "&quot;" );

    #print STDERR "web=$COMMON::BASEDIR/web.\n";
    opendir( D, "$COMMON::BASEDIR/public" ) ||
        &fatal("Cannot opendir($COMMON::BASEDIR/web:  $!");
    my @files = grep(/[^\.].*\.jpg/,readdir(D));
    closedir(D);
    my $item_to_filename = join("",
        "{\n",
	join(",\n", map { '"'.&filename_to_item($_).'":"'.$_.'"' } @files),
	"\n}" );

    print STDERR "CMC 1 menu=[$menu]\n";
    print STDERR "CMC 1 list=[$list]\n";
    print STDERR "CMC 1 stores=[$stores]\n";

    $s .= <<EOF;
<input type=hidden name=listind value="$COMMON::FORM{listind}">
<input type=hidden name=menu value="$menu">
<input type=hidden name=list value="$list">
<input type=hidden name=stores value="$stores">
<input type=hidden name=listname value="$listname">
<input type=hidden name=displaying value=show_list>
<center id=tableid></center>
<script type="text/javascript">setup();</script>
</form>
EOF

    $s =~ s+%%JSCRIPT%%+$jscript+gs;
    $s =~ s+%%FORMNAME%%+$FORMNAME+gs;
    $s =~ s+%%ITEM_TO_FILENAME%%+$item_to_filename+gs;
    $s =~ s+%%WEB%%+$COMMON::PROG+gs;

    &write_file("/tmp/dump",$s);
    &COMMON::xprint( $s );
    &footer("list");
    }

#########################################################################
#	Write form data to database.					#
#########################################################################
sub update_list
    {
    my $datetime = `date +"%m/%d/%Y %H:%M"`;
    chomp( $datetime );

    my @probs;

    foreach my $vn ( "menu", "stores", "listind", "listname" )
	{
        push(@probs,"$vn XL(is not specified.)") if( ! $COMMON::FORM{$vn} );
	}

    push( @probs, "XL(Menu is truncated)") if( length( $COMMON::FORM{menu} ) < 1000 );

    if( @probs )
	{
	push( @probs, "XL(Push the back button and fix the problem.)" );
	&COMMON::xprint( join("<br>",@probs) );
	&COMMON::cleanup();
	return;
	}

    &COMMON::dbwrite( $COMMON::DB );
    &COMMON::dbput( $COMMON::DB, "menu", $COMMON::FORM{menu} );
    &COMMON::dbput( $COMMON::DB, "stores", $COMMON::FORM{stores} );
    if( $COMMON::FORM{list} )
	{
	&COMMON::dbput( $COMMON::DB, "list", $COMMON::FORM{listind},
	    "data", $COMMON::FORM{list} );
	&COMMON::dbput( $COMMON::DB, "list", $COMMON::FORM{listind},
	    "name", $COMMON::FORM{listname} );
	&COMMON::dbput( $COMMON::DB, "list", $COMMON::FORM{listind},
	    "modifier", $COMMON::USER );
	&COMMON::dbput( $COMMON::DB, "list", $COMMON::FORM{listind},
	    "modified", $datetime );
	&COMMON::dbadd( $COMMON::DB, "lists", $COMMON::FORM{listind} );
	}
    else
        {
	&COMMON::dbdel( $COMMON::DB, "lists", $COMMON::FORM{listind} );
	$COMMON::FORM{listind} = "";
	}
    &COMMON::dbpop( $COMMON::DB );
    }


#########################################################################
#	Handle regular user commands					#
#########################################################################
sub user_logic
    {
    my $fnc = ( $COMMON::FORM{func} || "" );
    if( $fnc eq "admin"		) { &COMMON::admin_page();		}
    elsif( $fnc ne "" && $fnc ne "email" && $fnc ne "dirmode" && $fnc ne "dologin" && $fnc ne "show" )
        { &fatal("Unrecognized function \"$fnc\"."); }
    if( $fnc eq "show" )
        {
	if( $COMMON::FORM{arg} )
	    { $COMMON::FORM{listind} = $COMMON::FORM{arg}; }
	else
	    {
	    $COMMON::FORM{listind} = `date +%s`;
	    chomp( $COMMON::FORM{listind} );
	    }
	}
    &update_list() if( $COMMON::FORM{displaying} );
    if( $fnc eq "email" )
	{
	generate_email();
	}
    elsif( $COMMON::FORM{listind} )
        { &show_list(); }
    else
	{ &directory_screen(); }
    }

#########################################################################
#	Main								#
#########################################################################

if( ($ENV{SCRIPT_NAME}||"") eq "" )
    {
    my $fnc = ( $ARGV[0] || "" );
    if(    $fnc eq "reindex" )		{ reindex( $ARGV[1] );	}
    elsif( $fnc eq "print" )		{ dump_indices();	}
    elsif( $fnc eq "sanity" )		{ sanity();		}
    elsif( $fnc =~ /email=(.*)/ )	{ generate_email($1);	}
    else
	{
	&fatal("XL(Usage):  $COMMON::PROG.cgi (dump|dumpaccounts|dumptranslations|undump|undumpaccounts|undumptranslations) [ dumpname ]",0)
	}
    }

my $using_agent =
    $ENV{HTTP_USER_AGENT}
    || $COMMON::FORM{genform}
    || $COMMON::FORM{client}
    || "unknown";
my $agent =
#    ( $COMMON::FORM{genform} ? "PhoneGap_" . $COMMON::FORM{genform}
#    : $COMMON::FORM{client} ? "PhoneGap_" . $COMMON::FORM{client}
#    : $ENV{HTTP_USER_AGENT}
#    );
    (($COMMON::FORM{genform} || $COMMON::FORM{client}) ? "PhoneGap_" : "") .
    ( $using_agent =~ /iPhone/ ? "iPhone"
        : ( $using_agent =~ /Wget/ ? "iPhone"
	: ( $using_agent =~ /iPad/ ? "iPad"
	: $using_agent ) ) );

printf STDERR ( "CMC got to %d.\n", __LINE__ );

#my($nam,$pass,$uid,$gid,$quota,$comment,$gcos,$dir,$shell)
#    = getpwnam("$COMMON::USER");

#&COMMON::show_vars()
    #if( ! &inlist(($COMMON::FORM{func}||""),"download","view") );

$form_top = <<EOF;
<QSCRIPT SRC="usprompt.js" TYPE="text/javascript"></QSCRIPT>
<script>
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function submit_func( fnc, val )
    {
    with( window.document.$FORMNAME )
	{
	func.value = fnc;
	if( typeof(val) != "undefined" ) { arg.value = val ; }
	submit();
	}
    }
%%JSCRIPT%%
</script>
</head><body $COMMON::BODY_TAGS>
<form name=$FORMNAME method=post ENCTYPE="multipart/form-data">
<input type=hidden name=func>
<input type=hidden name=arg>
<input type=hidden name=SID value="$COMMON::SID">
<input type=hidden name=USER value="$COMMON::USER">
$COMMON::HELP_IFRAME
EOF

printf STDERR ( "CMC got to %d.\n", __LINE__ );

&user_logic();

&COMMON::cleanup(0);
