(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{141:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(36),s=a.n(l);a(83),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(84),a(85);var c=a(21),i=a(15),o=a(25),m=a(22),u=a(9),d=a(24),p=a(160),f=a(161),E=a(162),v=a(163),b=a(164),h=a(184),g=a(183),N=a(165),y=a(166),O=a(167),S=a(168),k=a(17),j=a(29),I=function(e){return{type:"USER",payload:{username:e}}},C=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).componentDidUpdate=function(){console.log(a.props)},a.toggle=a.toggle.bind(Object(u.a)(a)),a.state={isOpen:!1},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"toggle",value:function(){this.setState({isOpen:!this.state.isOpen})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(p.a,{className:"navbarheader",expand:"md",style:{height:"45px"}},r.a.createElement(k.b,{to:"/",className:"headername"},r.a.createElement(f.a,{className:"headername",style:{color:"#ff4422",fontSize:"20px",fontWeight:"bolder"}},"Home")),r.a.createElement(E.a,{onClick:this.toggle}),r.a.createElement(v.a,{isOpen:this.state.isOpen,navbar:!0},r.a.createElement(b.a,{className:"ml-auto ",navbar:!0},r.a.createElement(h.a,{className:"headername mr-4",nav:!0,inNavbar:!0},r.a.createElement(g.a,{className:"headername",nav:!0,caret:!0},""!==this.props.currentUser&&!0===this.props.IS_LOGGED_IN?"Welcome, "+this.props.currentUser:!1===this.props.IS_LOGGED_IN?"You are currently not Logged in":null),r.a.createElement(N.a,{right:!0},r.a.createElement(y.a,null,""!==this.props.currentUser&&!0===this.props.IS_LOGGED_IN?r.a.createElement(y.a,{className:"headername"},r.a.createElement(k.b,{to:"/"},r.a.createElement("p",{onClick:function(){return e.props.UserLogOut()}},"Logout"))):!1===this.props.IS_LOGGED_IN?r.a.createElement("div",null,r.a.createElement(y.a,{className:"headername"},r.a.createElement(k.b,{to:"/pages/register"},"Register")),r.a.createElement(y.a,{className:"headername"},r.a.createElement(k.b,{to:"/pages/loginPage"},"Login"))):null))),!0===this.props.IS_ADMIN?r.a.createElement("div",{className:"headername mr-4 justify-content-center pt-2"},r.a.createElement(k.b,{to:"/manage",className:"headername mr-4"},"MANAGE")):!1===this.props.IS_ADMIN?r.a.createElement("div",null):null,!1===this.props.IS_LOGGED_IN?r.a.createElement("div",{className:"row headername"},r.a.createElement(O.a,{className:"pl-3"},r.a.createElement(k.b,{to:"/pages/loginPage"},r.a.createElement(S.a,{className:"headername",style:{color:"white",fontWeight:"bolder"}},"LOGIN"))),r.a.createElement(O.a,{className:"pl-3"},r.a.createElement(k.b,{to:"/pages/register"},r.a.createElement(S.a,{className:"headername",style:{color:"white",fontWeight:"bolder"}},"REGISTER")))):!0===this.props.IS_LOGGED_IN?r.a.createElement("div",null):null))))}}]),t}(r.a.Component),x=Object(j.b)(function(e){return{currentUser:e.CURRENT_USER_DATA.currentUser,IS_ADMIN:e.CURRENT_USER_DATA.IS_ADMIN,IS_LOGGED_IN:e.CURRENT_USER_DATA.IS_LOGGED_IN}},{UserLogOut:function(){return{type:"LOGOUT"}}})(C),D=a(20),R=a.n(D),_=a(13),w=a(14),A=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(l)))).state={data:[],currentMovie:null,filtertext:""},a.setCurrentMovie=function(e){a.setState({currentMovie:e}),console.log("Current Movie is "+a.state.currentMovie)},a.onFilterChange=function(e){a.setState({filtertext:e})},a.getDataMovies=function(){R.a.get("http://localhost:2000/movies").then(function(e){a.setState({data:e.data})}).catch(function(e){console.log(e)})},a.printMovieData=function(){return a.state.data.filter(function(e){return-1!==e.title.toLowerCase().indexOf(a.state.filtertext.toLowerCase())}).map(function(e){return r.a.createElement("div",{className:"col-md-3 mycard mr-4 ml-4 mb-3 mt-3"},r.a.createElement("img",{src:e.image,alt:"MovieImage",width:"100%",height:"422px"}),r.a.createElement("div",{className:"mycardtext"},r.a.createElement("div",{className:"mb-2"}," ",e.title," "),r.a.createElement("div",{className:"mb-3",style:{fontSize:"15px",fontWeight:"bold"}}," ENGLISH "),r.a.createElement("p",null," ",r.a.createElement("input",{type:"button",style:{fontSize:"15px",fontWeight:"bold",marginBottom:"4px"},className:"buttongenre",value:e.genre}))),r.a.createElement(k.b,{to:"/moviedetail?id="+e.id},r.a.createElement("p",null,r.a.createElement("input",{type:"button",style:{height:"45px",fontWeight:"bolder",fontSize:"18px",backgroundColor:"#c02c3a",color:"white"},className:"btn btn-block",value:"DETAILS",onClick:function(){return a.setCurrentMovie(e.id)}}))))})},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.getDataMovies()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"mycontainer pt-5"},r.a.createElement("center",null,r.a.createElement("div",{className:"d-flex flex-row justify-content-center"},r.a.createElement("div",null,r.a.createElement("input",{type:"text",ref:"filterbox",onChange:function(){return e.onFilterChange(e.refs.filterbox.value)},className:"form-control form-control-lg mt-3 text-center",placeholder:"Input title to filter...",style:{width:"650px",alignSelf:"center",borderRadius:"3px",height:"47px"}})))),r.a.createElement("div",{className:"row justify-content-center mt-4"},this.printMovieData()))}}]),t}(r.a.Component),U=a(32),L=a(179),M=a(181),G=a(170),T=a(169),z=a(178),P=a(180),W=a(171),B=a(174),V=a(175),F=a(176),H=a(182),J=a(172),Y=a(173),q=a(177),K=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(l)))).state={data:[],modalOpen:!1,genreList:[],showSynopsis:!1,currentSynopsis:null,selectedEdit:0},a.getDataMovies=function(){R.a.get("http://localhost:2000/movies").then(function(e){a.setState({data:e.data})}).catch(function(e){console.log(e)})},a.synopsisPrint=function(e){for(var t=e.split(" "),a=[],n=0;n<5;n++)a.push(t[n]);return a.join(" ")},a.printMovieData=function(){return a.state.data.map(function(e){-1===a.state.genreList.indexOf(e.genre)&&a.state.genreList.push(e.genre)}),console.log(a.state),a.state.data.map(function(e,t){return e.id===a.state.selectedEdit?r.a.createElement(T.a,null,r.a.createElement(G.a,null,t+1),r.a.createElement(G.a,null,r.a.createElement("input",{type:"text",ref:"inputtitle",className:"form-control",defaultValue:e.title})),r.a.createElement(G.a,null,r.a.createElement("input",{type:"text",ref:"inputgenre",className:"form-control",defaultValue:e.genre})),r.a.createElement(G.a,null,r.a.createElement("input",{type:"text",ref:"inputimage",className:"form-control",defaultValue:e.image})),r.a.createElement(G.a,null,r.a.createElement("input",{type:"text",ref:"inputbannerimg",className:"form-control",defaultValue:e.bannerimg})),r.a.createElement(G.a,null,r.a.createElement("input",{type:"text",ref:"inputdirector",className:"form-control",defaultValue:e.director})),r.a.createElement(G.a,null,r.a.createElement("input",{type:"text",ref:"inputpt",className:"form-control",defaultValue:e.playingTime.join(",")})),r.a.createElement(G.a,null,r.a.createElement("input",{type:"text",ref:"inputdur",className:"form-control",defaultValue:e.duration})),r.a.createElement(G.a,null,r.a.createElement("textarea",{className:"form-control",ref:"inputsynopsis",defaultValue:e.synopsis})),r.a.createElement(G.a,null,r.a.createElement("div",null,r.a.createElement("input",{type:"button",value:"save",className:"btn btn-block btn-success btn-sm",onClick:function(){return a.btnSaveEditClick()}}),r.a.createElement("input",{type:"button",value:"cancel",className:"btn btn-block btn-danger btn-sm",onClick:function(){return a.setState({selectedEdit:0})}})))):r.a.createElement(T.a,null,r.a.createElement(G.a,null,t+1),r.a.createElement(G.a,null,e.title),r.a.createElement(G.a,null,e.genre),r.a.createElement(G.a,null,r.a.createElement("img",{src:e.image,height:"50px",alt:""})),r.a.createElement(G.a,null,r.a.createElement("img",{src:e.bannerimg,height:"50px",alt:""})),r.a.createElement(G.a,null,e.director),r.a.createElement(G.a,null,e.playingTime.join(",")),r.a.createElement(G.a,null,e.duration," Minutes"),r.a.createElement(G.a,null,!1===a.state.showSynopsis?r.a.createElement("div",null,a.synopsisPrint(e.synopsis),r.a.createElement("p",{class:"font-weight-bold readmore",onClick:function(){return a.setState({showSynopsis:!0,currentSynopsis:e.id})}},"...Read More")):!0===a.state.showSynopsis&&a.state.currentSynopsis===e.id===!1?r.a.createElement("div",null,a.synopsisPrint(e.synopsis),r.a.createElement("p",{class:"font-weight-bold readmore",onClick:function(){return a.setState({showSynopsis:!0,currentSynopsis:e.id})}},"...Read More")):!0===a.state.showSynopsis&&a.state.currentSynopsis===e.id===!0?r.a.createElement("div",null,a.fullSynopsisPrint()):null),r.a.createElement(G.a,null,r.a.createElement("div",null,r.a.createElement("input",{type:"button",value:"edit",className:"btn btn-block btn-primary btn-sm",onClick:function(){return a.buttonEditClick(e.id)}}),r.a.createElement("input",{type:"button",value:"delete",className:"btn btn-block btn-danger btn-sm",onClick:function(){return a.buttonDeleteClick(e.id,t)}}))))})},a.closeModal=function(){a.setState({modalOpen:!1}),console.log(a.state)},a.fullSynopsisPrint=function(){var e=a.state.currentSynopsis-1;return r.a.createElement("p",null,a.state.data[e].synopsis)},a.validateForm=function(){for(var e=a.refs.inputtitle.value,t=a.refs.inputdirector.value,n=a.refs.inputgenre.value,r=a.refs.inputurl.value,l=[],s=a.refs.inputduration.value,c=a.refs.inputbannerimg.value,i=a.refs.inputvideo.value,o=[9,14,17,20,22],m=1;m<=5;m++)!0===a.refs["radio"+m].refs["radio"+m+"Inner"].checked&&l.push(o[m-1]);alert(l);var u=a.refs.inputsynopsis.value;if(""===e.replace(/\s/g,"")||""===t.replace(/\s/g,"")||""===n.replace(/\s/g,"")||""===r.replace(/\s/g,"")||0===l.length||""===s.replace(/\s/g,"")||""===u.replace(/\s/g,"")||""===i.replace(/\s/g,""))return document.getElementById("warningbutton").innerHTML="harap mengisi form yang kosong !  ";var d=/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;if(!d.test(r)||!d.test(c))return document.getElementById("warningbutton").innerHTML="url tidak valid!  ";var p={genre:n,title:e,duration:s,synopsis:u,playingTime:l,director:t,image:r,bannerimg:c,video:i};R.a.post("http://localhost:2000/movies",p).then(function(e){window.alert("berhasil add data");var t=a.state.data;t.push(e.data),a.setState({data:t}),a.closeModal()}).catch(function(e){console.log(e)})},a.printGenreList=function(){return a.state.genreList.map(function(e){return r.a.createElement("option",{value:e},e)})},a.buttonEditClick=function(e){a.setState({selectedEdit:e})},a.buttonDeleteClick=function(e,t){window.confirm("Are you sure to delete this data ? ")&&R.a.delete("http://localhost:2000/movies/"+e).then(function(e){alert("Delete Data Success");var n=a.state.data;n.splice(t,1),a.setState({data:n})}).catch(function(e){})},a.btnSaveEditClick=function(){var e=a.refs.inputtitle.value,t=a.refs.inputdirector.value,n=a.refs.inputgenre.value,r=a.refs.inputimage.value,l=a.refs.inputpt.value.split(","),s=a.refs.inputdur.value,c=a.refs.inputsynopsis.value,i=a.refs.inputbannerimg.value,o=a.state.data[a.state.selectedEdit-1].video;if(""===e.replace(/\s/g,"")||""===t.replace(/\s/g,"")||""===n.replace(/\s/g,"")||""===r.replace(/\s/g,"")||0===l.length||""===s.replace(/\s/g,"")||""===c.replace(/\s/g,""))return window.alert("Form tidak boleh ada yang kosong");var m={genre:n,title:e,duration:s,synopsis:c,playingTime:l,director:t,image:r,bannerimg:i,video:o};window.confirm("Apakah anda yakin untuk mengedit data ? ")&&R.a.put("http://localhost:2000/movies/"+a.state.selectedEdit,m).then(function(e){console.log("INI RES DATA ",e.data),a.state.data[a.state.selectedEdit-1]=e.data,window.alert("Data sudah berhasil untuk diedit "),a.setState({data:a.state.data,selectedEdit:0})}).catch(function(e){console.log(e)})},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.getDataMovies()}},{key:"render",value:function(){var e=this;return!1===this.props.IS_ADMIN?r.a.createElement("h1",{className:"pt-5"}," You do not have permission to modify movie data"):r.a.createElement("div",{class:"mycontainer"},r.a.createElement(W.a,{fixed:!0},r.a.createElement("h1",{className:"pt-5 filtercss"},r.a.createElement("center",null,"Manage Movie Page")),r.a.createElement("input",{type:"button",value:"Add Data",className:"btn btn-success mb-2 mt-2",onClick:function(){return e.setState({modalOpen:!0})}}),r.a.createElement(H.a,{isOpen:this.state.modalOpen,toggle:this.closeModal},r.a.createElement(J.a,null,"Add Movie"),r.a.createElement(Y.a,null,r.a.createElement("input",{type:"text",ref:"inputtitle",className:"form-control mb-2",placeholder:"Title"}),r.a.createElement("input",{type:"text",ref:"inputdirector",className:"form-control mb-2",placeholder:"Director"}),r.a.createElement("select",{required:!0,id:"myList",ref:"inputgenre",className:"form-control mb-2",placeholder:"Genre"},r.a.createElement("option",{value:"",disabled:!0,selected:!0,hidden:!0},"Choose Genre"),this.printGenreList()),r.a.createElement("input",{type:"text",ref:"inputurl",className:"form-control mb-2",placeholder:"Image Url"}),r.a.createElement("div",null,r.a.createElement(B.a,{check:!0,inline:!0},r.a.createElement(V.a,null,"Playing at :")),r.a.createElement(B.a,{check:!0,inline:!0},r.a.createElement(V.a,{check:!0},r.a.createElement(F.a,{type:"radio",value:"9",ref:"radio1",innerRef:"radio1Inner"}),"09:00")),r.a.createElement(B.a,{check:!0,inline:!0},r.a.createElement(V.a,{check:!0},r.a.createElement(F.a,{type:"radio",value:"14",ref:"radio2",innerRef:"radio2Inner"}),"14:00")),r.a.createElement(B.a,{check:!0,inline:!0},r.a.createElement(V.a,{check:!0},r.a.createElement(F.a,{type:"radio",value:"17",ref:"radio3",innerRef:"radio3Inner"}),"17:00")),r.a.createElement(B.a,{check:!0,inline:!0},r.a.createElement(V.a,{check:!0},r.a.createElement(F.a,{type:"radio",value:"20",ref:"radio4",innerRef:"radio4Inner"}),"20:00")),r.a.createElement(B.a,{check:!0,inline:!0},r.a.createElement(V.a,{check:!0},r.a.createElement(F.a,{type:"radio",value:"22",ref:"radio5",innerRef:"radio5Inner"}),"22:00"))),r.a.createElement("input",{type:"number",ref:"inputduration",className:"form-control mb-2",placeholder:"Duration"}),r.a.createElement("input",{type:"text",ref:"inputbannerimg",className:"form-control mb-2",placeholder:"Link Banner Image"}),r.a.createElement("input",{type:"text",ref:"inputvideo",className:"form-control mb-2",placeholder:"Video Embed Link"}),r.a.createElement("textarea",{ref:"inputsynopsis",className:"form-control mb-2",placeholder:"Synopsis"}),r.a.createElement("p",{id:"warningbutton",style:{color:"red"}}," ")),r.a.createElement(q.a,null,r.a.createElement("input",{type:"button",value:"SAVE",className:"btn btn-success ",onClick:this.validateForm}),r.a.createElement("input",{type:"button",value:"CANCEL",className:"btn btn-danger",onClick:this.closeModal}))),r.a.createElement(z.a,null,r.a.createElement(L.a,null,r.a.createElement(P.a,null,r.a.createElement(G.a,null,"No"),r.a.createElement(G.a,null,"Title"),r.a.createElement(G.a,null,"Genre"),r.a.createElement(G.a,null,"Image"),r.a.createElement(G.a,null,"Banner Image"),r.a.createElement(G.a,null,"Director"),r.a.createElement(G.a,null,"Playtime"),r.a.createElement(G.a,null,"Duration"),r.a.createElement(G.a,null,"Synopsis"),r.a.createElement(G.a,null,"Action")),r.a.createElement(M.a,null,this.printMovieData())))))}}]),t}(r.a.Component),X=Object(j.b)(function(e){return{currentUser:e.CURRENT_USER_DATA.currentUser,IS_ADMIN:e.CURRENT_USER_DATA.IS_ADMIN,IS_LOGGED_IN:e.CURRENT_USER_DATA.IS_LOGGED_IN}})(K),$=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(o.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={data:[],login:!0,modalOpen:!1,buyTicket:!1},a.playingTimeRender=function(e){return[e].join(",")},a.onButtonTicketClick=function(){!1===a.props.IS_LOGGED_IN?a.setState({login:!1}):!0===a.props.IS_LOGGED_IN&&a.setState({buyTicket:!0})},a.openModal=function(){a.setState({modalOpen:!0})},a.closeModal=function(){a.setState({modalOpen:!1})},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.location.search.replace("?id=","");R.a.get("http://localhost:2000/movies/"+t).then(function(t){e.setState({data:t.data}),console.log(e.state.data)}).catch(function(e){console.log(e)})}},{key:"render",value:function(){var e=this;return!1===this.state.login?r.a.createElement(U.a,{to:"/pages/loginPage"}):!0===this.state.login&&!0===this.state.buyTicket?r.a.createElement(U.a,{to:"/pages/seatReservation"}):r.a.createElement("div",{className:"mycontainer"},r.a.createElement("div",{className:"banner"},r.a.createElement("img",{src:this.state.data.bannerimg,class:"img-fluid",width:"100%",alt:"whatever"}),r.a.createElement("div",{onClick:function(){return e.openModal()},className:"logobanner"},"Preview Trailer   ",r.a.createElement(_.a,{icon:w.b})),r.a.createElement(H.a,{isOpen:this.state.modalOpen,toggle:this.closeModal,size:"lg",style:{maxWidth:"1600px",width:"80%"}},r.a.createElement("iframe",{class:"embed-responsive",width:"1500px",height:"800px",src:this.state.data.video,frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:!0}))),r.a.createElement("div",{className:"container mt-5  p-0"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-4 p-4"},r.a.createElement("img",{class:"img-fluid",src:this.state.data.image,height:"100%",width:"100%",alt:""})),r.a.createElement("div",{className:"col-md-8 p-4"},r.a.createElement("div",{className:"text-light"},r.a.createElement("h1",{className:"mb-3"},this.state.data.title),r.a.createElement("div",{className:"badge badge-pill badge-danger mb-3",style:{fontSize:"20px"}},this.state.data.genre),r.a.createElement("div",{class:"h3 mb-4"},"Director : ",this.state.data.director),r.a.createElement("div",{className:"badge badge-pill badge-secondary mb-3",style:{fontSize:"15px"}},this.state.data.duration," Minutes "),r.a.createElement("p",{className:"mb-4"}," Playing At : ",this.playingTimeRender(this.state.data.playingTime)),r.a.createElement("div",{class:"h3 mb-4",style:{fontWeight:"bolder"}},"Synopsis"),r.a.createElement("p",{className:"mb-4",style:{fontStyle:"italic"}},this.state.data.synopsis))),r.a.createElement("input",{type:"button",className:"form-control btn-success mb-5",style:{fontSize:"20px",fontWeight:"bolder"},value:"BUY TICKET",onClick:function(){return e.onButtonTicketClick()}}))))}}]),t}(r.a.Component),Q=Object(j.b)(function(e){return{currentUser:e.CURRENT_USER_DATA.currentUser,IS_ADMIN:e.CURRENT_USER_DATA.IS_ADMIN,IS_LOGGED_IN:e.CURRENT_USER_DATA.IS_LOGGED_IN}})($),Z=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(o.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={userdata:[],redirect:!1},a.getLoginData=function(){R.a.get("http://localhost:2000/users/").then(function(e){console.log(e.data),a.setState({userdata:e.data})}).catch(function(e){console.log(e)})},a.validateUser=function(){var e=a.refs.userIdLog.value,t=a.refs.userPassLog.value,n=!1;a.state.userdata.map(function(r){if(e===r.username&&t===r.password){if(a.setState({redirect:!0}),n=!0,"user"===r.role)return a.props.logUser(r.username);if("admin"===r.role)return a.props.logAdmin(r.username)}}),!1===n&&window.alert("not valid")},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.getLoginData()}},{key:"render",value:function(){var e=this;return this.state.redirect?r.a.createElement(U.a,{to:"/",push:!0}):r.a.createElement("div",{className:"mycontainer"},r.a.createElement("div",{className:"row justify-content-center mt-5"},r.a.createElement("div",{className:"col-md-8"},r.a.createElement(z.a,{className:"p-5 mt-5"},r.a.createElement("h1",{className:"mb-5"},"Log In"),r.a.createElement("input",{type:"text",ref:"userIdLog",className:"form-control form-control-lg mt-3 mb-3",placeholder:"username"}),r.a.createElement("input",{type:"password",ref:"userPassLog",className:"form-control form-control-lg mt-3 mb-5",placeholder:"password"}),r.a.createElement("p",{className:"mb-5",style:{color:"red",fontWeight:"bolder"}}," "),r.a.createElement("input",{type:"button",className:"btn btn-outline-success btn-lg mt-3 mb-5",value:"Submit",onClick:function(){return e.validateUser()}}),r.a.createElement(k.b,{to:"/pages/register"},r.a.createElement("p",{className:"mb-3",style:{textDecoration:"underline",color:"black"}},"Dont Have an Account ? Sign in now "))))))}}]),t}(r.a.Component),ee=Object(j.b)(function(e){return{currentUser:e.CURRENT_USER_DATA.currentUser,IS_ADMIN:e.CURRENT_USER_DATA.IS_ADMIN,IS_LOGGED_IN:e.CURRENT_USER_DATA.IS_LOGGED_IN}},{logUser:I,logAdmin:function(e){return{type:"ADMIN",payload:{username:e}}}})(Z),te=a(76),ae=a.n(te),ne=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(o.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={userdata:[],err:"",isLoading:!1},a.getLoginData=function(){R.a.get("http://localhost:2000/users/").then(function(e){a.setState({userdata:e.data})}).catch(function(e){console.log(e)})},a.registerIsValid=function(){var e=a.refs.reguser.value,t=a.refs.regpass.value,n=a.refs.regpass2.value;if(console.log(e,t,n),""===e||""===t||""===n)return a.setState({err:"Please complete the empty field"});if(t!==n)return a.setState({err:"Your password and confirm password does not match"});a.setState({isLoading:!0}),R.a.get("http://localhost:2000/users?username="+e).then(function(e){console.log("MasukAxios1"),e.data.length>0&&a.setState({err:"Username is already being used",isLoading:!1})}).catch(function(e){console.log(e,"Masuk")});var r={role:"user",username:e,password:t};R.a.post("http://localhost:2000/users",r).then(function(t){window.alert("Your account has been registered successfully"),a.props.logUser(e),a.setState({redirect:!0,isLoading:!1})}).catch(function(e){console.log(e)})},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.getLoginData()}},{key:"render",value:function(){var e=this;return!0===this.props.IS_LOGGED_IN?r.a.createElement(U.a,{to:"/"}):r.a.createElement("div",{className:"mycontainer"},r.a.createElement("div",{className:"row justify-content-center mt-5"},r.a.createElement("div",{className:" mt-5 col-md-8"},r.a.createElement(z.a,{className:"p-5"},r.a.createElement("h1",{className:"mb-5"},"Register Form"),r.a.createElement("input",{type:"text",ref:"reguser",className:"form-control form-control-lg mt-3",placeholder:"your username"}),r.a.createElement("input",{type:"password",ref:"regpass",className:"form-control form-control-lg mt-3",placeholder:"your password"}),r.a.createElement("input",{type:"password",ref:"regpass2",className:"form-control  form-control-lg mt-3 mb-3 ",placeholder:"confirm password"}),r.a.createElement("p",{className:"mb-3",style:{color:"red",fontWeight:"bolder"}}," "),""===this.state.err?r.a.createElement("p",null):""!==this.state.err?r.a.createElement("div",{className:"alert alert-danger"}," ",this.state.err," ",r.a.createElement("span",{style:{fontWeight:"bolder",cursor:"pointer",float:"right"},onClick:function(){e.setState({err:""})}}," X")):null,!0===this.state.isLoading?r.a.createElement(ae.a,{type:"ThreeDots",color:"black",width:"55px"}):!1===this.state.isLoading?r.a.createElement("input",{type:"button",className:"btn btn-outline-success btn-lg mt-3",value:"Register",onClick:function(){return e.registerIsValid()}}):null))))}}]),t}(r.a.Component),re=Object(j.b)(function(e){return{currentUser:e.CURRENT_USER_DATA.currentUser,IS_ADMIN:e.CURRENT_USER_DATA.IS_ADMIN,IS_LOGGED_IN:e.CURRENT_USER_DATA.IS_LOGGED_IN}},{logUser:I})(ne),le=a(4),se=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(l)))).state={seatSelected:[],color:"white",seats:[],seatReserved:[],seatAvailable:[]},a.componentDidMount=function(){for(var e=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],t=0;t<"ABCDEFGHIJ".length;t++)for(var n=0;n<e.length;n++){var r="ABCDEFGHIJ"[t]+e[n];a.state.seats.push(r),a.state.seatAvailable.push(r)}},a.onClickSeat=function(e){-1!==a.state.seatReserved.indexOf(e)?(console.log("Masuk"),a.setState({seatAvailable:a.state.seatAvailable.concat(e),seatReserved:a.state.seatReserved.filter(function(t){return t!=e})})):a.setState({seatReserved:a.state.seatReserved.concat(e),seatAvailable:a.state.seatAvailable.filter(function(t){return t!=e})})},a.printSeatReservation=function(){return"ABCDEFGHIJ".split("").map(function(e){var t,n,l,s,c,i,o,m,u,d,p,f,E,v,b,h,g,N;return r.a.createElement("div",{className:"row justify-content-center filtercss"},r.a.createElement("div",{className:"row-md-1 d-inline filtercss"},e),r.a.createElement("div",{className:"row-md-3 d-inline ml-5"},r.a.createElement(_.a,(t={className:"seaticon",size:"2x",value:e+"1"},Object(le.a)(t,"className",-1!==a.state.seatReserved.indexOf(e+"1")?"seatreserved":"seatavailable"),Object(le.a)(t,"icon",w.a),Object(le.a)(t,"onClick",function(){return a.onClickSeat(e+"1")}),t)),r.a.createElement(_.a,(n={className:"seaticon",size:"2x",value:e+"2"},Object(le.a)(n,"className",-1!==a.state.seatReserved.indexOf(e+"2")?"seatreserved":"seatavailable"),Object(le.a)(n,"icon",w.a),Object(le.a)(n,"onClick",function(){return a.onClickSeat(e+"2")}),n)),r.a.createElement(_.a,(l={className:"seaticon",size:"2x",value:e+"3"},Object(le.a)(l,"className",-1!==a.state.seatReserved.indexOf(e+"3")?"seatreserved":"seatavailable"),Object(le.a)(l,"icon",w.a),Object(le.a)(l,"onClick",function(){return a.onClickSeat(e+"3")}),l)),r.a.createElement(_.a,(s={className:"seaticon",size:"2x",value:e+"4"},Object(le.a)(s,"className",-1!==a.state.seatReserved.indexOf(e+"4")?"seatreserved":"seatavailable"),Object(le.a)(s,"icon",w.a),Object(le.a)(s,"onClick",function(){return a.onClickSeat(e+"4")}),s))),r.a.createElement("div",{className:"row-md-5 d-inline mr-5 ml-5"},r.a.createElement(_.a,(c={className:"seaticon",size:"2x",value:e+"5"},Object(le.a)(c,"className",-1!==a.state.seatReserved.indexOf(e+"5")?"seatreserved":"seatavailable"),Object(le.a)(c,"icon",w.a),Object(le.a)(c,"onClick",function(){return a.onClickSeat(e+"5")}),c)),r.a.createElement(_.a,(i={className:"seaticon",size:"2x",value:e+"6"},Object(le.a)(i,"className",-1!==a.state.seatReserved.indexOf(e+"6")?"seatreserved":"seatavailable"),Object(le.a)(i,"icon",w.a),Object(le.a)(i,"onClick",function(){return a.onClickSeat(e+"6")}),i)),r.a.createElement(_.a,(o={className:"seaticon",size:"2x",value:e+"7"},Object(le.a)(o,"className",-1!==a.state.seatReserved.indexOf(e+"7")?"seatreserved":"seatavailable"),Object(le.a)(o,"icon",w.a),Object(le.a)(o,"onClick",function(){return a.onClickSeat(e+"7")}),o)),r.a.createElement(_.a,(m={className:"seaticon",size:"2x",value:e+"8"},Object(le.a)(m,"className",-1!==a.state.seatReserved.indexOf(e+"8")?"seatreserved":"seatavailable"),Object(le.a)(m,"icon",w.a),Object(le.a)(m,"onClick",function(){return a.onClickSeat(e+"8")}),m)),r.a.createElement(_.a,(u={className:"seaticon",size:"2x",value:e+"9"},Object(le.a)(u,"className",-1!==a.state.seatReserved.indexOf(e+"9")?"seatreserved":"seatavailable"),Object(le.a)(u,"icon",w.a),Object(le.a)(u,"onClick",function(){return a.onClickSeat(e+"9")}),u)),r.a.createElement(_.a,(d={className:"seaticon",size:"2x",value:e+"10"},Object(le.a)(d,"className",-1!==a.state.seatReserved.indexOf(e+"10")?"seatreserved":"seatavailable"),Object(le.a)(d,"icon",w.a),Object(le.a)(d,"onClick",function(){return a.onClickSeat(e+"10")}),d)),r.a.createElement(_.a,(p={className:"seaticon",size:"2x",value:e+"11"},Object(le.a)(p,"className",-1!==a.state.seatReserved.indexOf(e+"11")?"seatreserved":"seatavailable"),Object(le.a)(p,"icon",w.a),Object(le.a)(p,"onClick",function(){return a.onClickSeat(e+"11")}),p)),r.a.createElement(_.a,(f={className:"seaticon",size:"2x",value:e+"12"},Object(le.a)(f,"className",-1!==a.state.seatReserved.indexOf(e+"12")?"seatreserved":"seatavailable"),Object(le.a)(f,"icon",w.a),Object(le.a)(f,"onClick",function(){return a.onClickSeat(e+"12")}),f)),r.a.createElement(_.a,(E={className:"seaticon",size:"2x",value:e+"13"},Object(le.a)(E,"className",-1!==a.state.seatReserved.indexOf(e+"13")?"seatreserved":"seatavailable"),Object(le.a)(E,"icon",w.a),Object(le.a)(E,"onClick",function(){return a.onClickSeat(e+"13")}),E)),r.a.createElement(_.a,(v={className:"seaticon",size:"2x",value:e+"14"},Object(le.a)(v,"className",-1!==a.state.seatReserved.indexOf(e+"14")?"seatreserved":"seatavailable"),Object(le.a)(v,"icon",w.a),Object(le.a)(v,"onClick",function(){return a.onClickSeat(e+"14")}),v))),r.a.createElement("div",{className:"row-md-3 d-inline mr-5"},r.a.createElement(_.a,(b={className:"seaticon",size:"2x",value:e+"15"},Object(le.a)(b,"className",-1!==a.state.seatReserved.indexOf(e+"15")?"seatreserved":"seatavailable"),Object(le.a)(b,"icon",w.a),Object(le.a)(b,"onClick",function(){return a.onClickSeat(e+"15")}),b),">"),r.a.createElement(_.a,(h={className:"seaticon",size:"2x",value:e+"16"},Object(le.a)(h,"className",-1!==a.state.seatReserved.indexOf(e+"16")?"seatreserved":"seatavailable"),Object(le.a)(h,"icon",w.a),Object(le.a)(h,"onClick",function(){return a.onClickSeat(e+"16")}),h),">"),r.a.createElement(_.a,(g={className:"seaticon",size:"2x",value:e+"17"},Object(le.a)(g,"className",-1!==a.state.seatReserved.indexOf(e+"17")?"seatreserved":"seatavailable"),Object(le.a)(g,"icon",w.a),Object(le.a)(g,"onClick",function(){return a.onClickSeat(e+"17")}),g),">"),r.a.createElement(_.a,(N={className:"seaticon",size:"2x",value:e+"18"},Object(le.a)(N,"className",-1!==a.state.seatReserved.indexOf(e+"18")?"seatreserved":"seatavailable"),Object(le.a)(N,"icon",w.a),Object(le.a)(N,"onClick",function(){return a.onClickSeat(e+"18")}),N),">")))})},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"mycontainer"},r.a.createElement("div",{className:"container mt-5"},r.a.createElement("div",{className:"col mb-5"},r.a.createElement("div",{className:"filtercss row-md-4 text-center mb-5",style:{fontSize:"40px"}},"Available Seats"),this.printSeatReservation()),r.a.createElement("input",{type:"button",className:"form-control btn-danger filtercss mb-4",value:"PROCEED"}),r.a.createElement("div",{className:"justify-content-left filtercss "},"Number of Tickets : \xa0\xa0",r.a.createElement("input",{type:"text",className:"form-control",style:{width:"150px",fontWeight:"bolder",fontSize:"23px"},value:this.state.seatReserved.length+"  Tickets",readOnly:!0})),r.a.createElement("div",{className:"justify-content-left filtercss mt-5"},"Seats Taken : \xa0\xa0",r.a.createElement("input",{type:"text",className:"form-control",style:{width:"250px",fontWeight:"bolder",fontSize:"23px"},value:this.state.seatReserved.join(","),readOnly:!0}))))}}]),t}(r.a.Component);var ce=function(){return r.a.createElement("div",null,r.a.createElement(x,null),r.a.createElement(U.b,{path:"/",exact:!0,component:A}),r.a.createElement(U.b,{path:"/manage",component:X}),r.a.createElement(U.b,{path:"/moviedetail",component:Q}),r.a.createElement(U.b,{path:"/pages/loginPage",component:ee}),r.a.createElement(U.b,{path:"/pages/register",component:re}),r.a.createElement(U.b,{path:"/pages/seatReservation",component:se}))},ie=a(16),oe={currentUser:"",IS_LOGGED_IN:!1,IS_ADMIN:!1},me=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:oe,t=arguments.length>1?arguments[1]:void 0;if("USER"===t.type){var a=t.payload.username;return Object(ie.a)({},e,{IS_LOGGED_IN:!0,IS_ADMIN:!1,currentUser:a})}if("ADMIN"===t.type)return a=t.payload.username,Object(ie.a)({},e,{IS_LOGGED_IN:!0,IS_ADMIN:!0,currentUser:a});return"LOGOUT"===t.type?Object(ie.a)({},e,{IS_LOGGED_IN:!1,IS_ADMIN:!1}):e},ue=a(44),de=Object(ue.b)({CURRENT_USER_DATA:me}),pe=Object(ue.c)(de);s.a.render(r.a.createElement(j.a,{store:pe},r.a.createElement(k.a,null,r.a.createElement(ce,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},78:function(e,t,a){e.exports=a(141)},83:function(e,t,a){},85:function(e,t,a){}},[[78,1,2]]]);
//# sourceMappingURL=main.28ff39a6.chunk.js.map