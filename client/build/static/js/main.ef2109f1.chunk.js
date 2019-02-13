(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{160:function(e,t,a){e.exports=a(329)},168:function(e,t,a){},326:function(e,t,a){},329:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"getUsers",function(){return Q}),a.d(n,"prevAction",function(){return Y}),a.d(n,"nextAction",function(){return ee}),a.d(n,"getTotal",function(){return te}),a.d(n,"searchUsers",function(){return ae}),a.d(n,"updateUser",function(){return ne}),a.d(n,"saveUser",function(){return re}),a.d(n,"deleteUser",function(){return le}),a.d(n,"sortAction",function(){return oe});var r=a(0),l=a.n(r),o=a(29),c=a.n(o),i=a(12),s=a(14),u=a(148),m=a(149),p=(a(168),a(19)),d=a(20),h=a(22),E=a(21),f=a(23),g=a(342),b=a(158),v=a(341),S=a(340),y=function(){return l.a.createElement(l.a.Fragment,null)},N=function(){return l.a.createElement("p",{className:"mt-5 mb-3 text-muted text-center"},"\xa9William Jiang 2018-2019")},O=a(330),_=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{style:{float:"right",marginRight:"30px"}},l.a.createElement(O.a,{exact:!0,activeStyle:{color:"green"},to:"/login"},"Login",l.a.createElement("i",{className:"fa fa-user"}))," | ",l.a.createElement(O.a,{exact:!0,activeStyle:{color:"green"},to:"/signup"},"SignUp",l.a.createElement("i",{className:"fa fa-sign-in"}))," | ",l.a.createElement(O.a,{exact:!0,activeStyle:{color:"green"},to:"/logout"},"Logout",l.a.createElement("i",{className:"fa fa-sign-out"}))))},C=a(26),j=a(343),A=a(331),U=a(338),T=a(344),L=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(E.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",done:!1},a.validateForm=function(){return a.state.email.length>0&&a.state.password.length>0},a.handleChange=function(e){a.setState(Object(C.a)({},e.target.id,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),a.props.loginAction(a.state).then(function(e){var t=a.props.login.token;t&&(a.setState({done:!0}),sessionStorage.setItem("userLoginToken",t))})},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"componentDidUnMount",value:function(){this.setState({email:"",password:""})}},{key:"render",value:function(){var e=this.props.login,t=e.email;return e.loggedIn&&t&&this.state.done?l.a.createElement(v.a,{to:"/users/".concat(t)}):l.a.createElement("div",{className:"login"},l.a.createElement("h1",null,"Login ",l.a.createElement("i",{className:"fa fa-user"})),l.a.createElement("form",{onSubmit:this.handleSubmit},l.a.createElement(j.a,{controlId:"email",bsSize:"large"},l.a.createElement(A.a,null,"Email"),l.a.createElement(U.a,{autoFocus:!0,type:"email",placeholder:"Email",value:this.state.email,onChange:this.handleChange})),l.a.createElement(j.a,{controlId:"password",bsSize:"large"},l.a.createElement(A.a,null,"Password"),l.a.createElement(U.a,{type:"password",placeholder:"Password",value:this.state.password,onChange:this.handleChange})),l.a.createElement(T.a,{block:!0,type:"submit",disabled:!this.validateForm(),bsSize:"large",bsStyle:"danger"},"Login ",l.a.createElement("i",{className:"fa fa-user"}))))}}]),t}(r.Component),w=Object(s.b)(function(e){return{login:e.login}},{loginAction:function(e){return function(t){return fetch("/api/login",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){return e.success&&e.token?t({type:"LOGIN_ACTION_SUCCESS",payload:e.token}):t({type:"LOGIN_ACTION_FAIL",payload:e})}).catch(function(e){return console.error(e)})}}})(L),k=function(e){return null===e||void 0===e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length},I=function(e,t){return l.a.createElement("div",{className:"jumbotron jumbotron-fluid"},l.a.createElement("div",{className:"container"},l.a.createElement(r.Fragment,null,e),l.a.createElement(r.Fragment,null,t)))},R=function(e,t){for(var a in e)if(!(a in t)||e[a]!==t[a])return!1;for(var n in t)if(!(n in e))return!1;return!0},F=a(103),x={success:["Welcome ",l.a.createElement("p",null,"Go to ",l.a.createElement(F.a,{to:"/login"},"Login ",l.a.createElement("i",{className:"fa fa-user"}))," to start!")],fail:["NOT Successful, Already Exist ",l.a.createElement("p",null,"Try again or Go back to ",l.a.createElement(F.a,{to:"/login"},"Login ",l.a.createElement("i",{className:"fa fa-user"})))]},D=function(e){var t,a,n=e.email;return e.ok?(t=l.a.createElement("h3",null,x.success[0],n,"."),a=x.success[1]):(t=l.a.createElement("h3",null,x.fail[0],n,"."),a=x.fail[1]),I(t,a)},P=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(E.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",done:0},a.validateForm=function(){return a.state.email.length>0&&a.state.password.length>0&&!a.state.done},a.handleChange=function(e){a.setState(Object(C.a)({},e.target.id,e.target.value)),a.state.done&&a.setState({done:0})},a.handleSubmit=function(e){e.preventDefault(),a.props.signupAction(a.state).then(function(){a.props.signup.success?a.setState({done:1}):a.setState({done:2})})},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,a=e.done;return l.a.createElement("div",{className:"signup"},l.a.createElement("h1",null,"Sign Up ",l.a.createElement("i",{className:"fa fa-sign-in"})),!!a&&l.a.createElement(D,{email:t,ok:1===a}),l.a.createElement("form",{onSubmit:this.handleSubmit},l.a.createElement(j.a,{controlId:"email",bsSize:"large"},l.a.createElement(A.a,null,"Email"),l.a.createElement(U.a,{autoFocus:!0,type:"email",placeholder:"Email",value:t,onChange:this.handleChange})),l.a.createElement(j.a,{controlId:"password",bsSize:"large"},l.a.createElement(A.a,null,"Password"),l.a.createElement(U.a,{type:"password",placeholder:"Password",value:this.state.password,onChange:this.handleChange})),l.a.createElement(T.a,{block:!0,type:"submit",disabled:!this.validateForm(),bsSize:"large",bsStyle:"danger"},"SignUp ",l.a.createElement("i",{className:"fa fa-sign-in"}))))}}]),t}(r.Component),G=Object(s.b)(function(e){return{signup:e.signup}},{signupAction:function(e){return function(t){return fetch("/api/signup",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){return e.success?t({type:"SIGNUP_ACTION_SUCCESS",payload:e}):t({type:"SIGNUP_ACTION_FAIL",payload:e})}).catch(function(e){return console.error(e)})}}})(P),M=a(40),H=a(75),z=a(104),J=a(332),B=a(333),X=a(334),Z=function(e){var t=e.id,a=e.label,n=e.help,r=Object(z.a)(e,["id","label","help"]);return l.a.createElement(j.a,{controlId:t},l.a.createElement(A.a,null,a,":"),l.a.createElement(U.a,r),n&&l.a.createElement(J.a,null,n))},q=function(e){var t=e.email,a=l.a.createElement("h3",null,"Update ",t," Successful."),n=l.a.createElement("p",null,"Return ",l.a.createElement(F.a,{to:"/login"},"Login ",l.a.createElement("i",{className:"fa fa-user"})));return I(a,n)},V=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(E.a)(t)).call.apply(e,[this].concat(r)))).state={firstName:"",lastName:"",team:[],role:"",location:"",comment:"",step:null,done:!1},a.validateForm=function(){return a.state.firstName.length>0&&a.state.lastName.length>0},a.handleChange=function(e){"radio"===e.target.type?e.target.checked&&a.setState({role:e.target.id}):"checkbox"===e.target.type?e.target.checked?a.setState({team:[].concat(Object(H.a)(a.state.team),[e.target.id])}):a.setState({team:a.state.team.filter(function(t){return t!==e.target.id})}):a.setState(Object(C.a)({},e.target.id,e.target.value))},a.handleSubmit=function(e){e.preventDefault();var t=a.props.login,n=t.loggedIn,r=t.token,l=t.email;if(n){var o=a.state,c=(o.step,o.done,Object(z.a)(o,["step","done"])),i=Object(M.a)({},c,{email:l});a.props.updateUserAction(i,r).then(function(){return a.setState({done:!0})})}else a.setState({step:"login"})},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e,t=this,a=this.props.login,n=a.loggedIn,r=a.token,l=(this.props.match.params||this.props.email).email;n?(e=1e3,new Promise(function(t,a){e=e||2e3,setTimeout(function(){return t("user-login")},e)})).then(function(){return t.props.getUserAction(l,r)}).then(function(){t.setState(function(e,t){if(!k(t.user))return{firstName:t.user.firstName||"",lastName:t.user.lastName||"",team:t.user.team,role:t.user.role||"",location:t.user.location||"",comment:t.user.comment||""}})}):this.setState({step:"login"})}},{key:"render",value:function(){var e=this;if(this.state.step)return l.a.createElement(v.a,{to:"/".concat(this.state.step)});var t="";try{t=this.props.login.email}catch(a){}return k(this.props.user)?l.a.createElement("div",{className:"loader"}):l.a.createElement("div",{className:"user"},this.state.done&&l.a.createElement(q,{email:t}),l.a.createElement("h3",null,l.a.createElement("u",null,t)," Preview & Edit ",l.a.createElement("i",{className:"fa fa-edit"})),l.a.createElement("form",{onSubmit:this.handleSubmit},l.a.createElement(Z,{id:"firstName",label:"First Name",help:"First Name is a mandatory field.",type:"text",placeholder:"First Name",value:this.state.firstName,onChange:this.handleChange}),l.a.createElement(Z,{id:"lastName",label:"Last Name",help:"Last Name is a mandatory field.",type:"text",placeholder:"Last Name",value:this.state.lastName,onChange:this.handleChange}),l.a.createElement(j.a,{id:"team",bsSize:"large",style:{margin:"15px"}},l.a.createElement(A.a,null,"Team:"),["Development Team","Support Group","Admin"].map(function(t){return l.a.createElement(B.a,{inline:!0,key:t,id:t,onChange:e.handleChange,checked:-1!==e.state.team.indexOf(t)},t)})),l.a.createElement(j.a,{id:"role",bsSize:"large"},l.a.createElement(A.a,null,"Role:"),["Scrum Master","Project Manager","Business Analyst"].map(function(t){return l.a.createElement(X.a,{name:"radioGroup",inline:!0,id:t,key:t,onChange:e.handleChange,checked:e.state.role===t},t)})),l.a.createElement(j.a,{controlId:"location",bsSize:"large"},l.a.createElement(A.a,null,"Location:"),l.a.createElement(U.a,{componentClass:"select",placeholder:"select",value:this.state.location,onChange:this.handleChange},l.a.createElement("option",{value:"select"},"-- location --"),["HK","GZ","XA","Other"].map(function(e){return l.a.createElement("option",{value:e,key:e},e)}))),l.a.createElement(j.a,{controlId:"comment",bsSize:"large"},l.a.createElement(A.a,null,"Comment:"),l.a.createElement(U.a,{componentClass:"textarea",placeholder:"User Comment & Notes",value:this.state.comment,onChange:this.handleChange})),l.a.createElement(T.a,{block:!0,type:"submit",bsSize:"large",bsStyle:"danger"},"Edit ",t," ",l.a.createElement("i",{className:"fa fa-edit"}))))}}]),t}(r.Component),W=Object(s.b)(function(e){return{user:e.user,login:e.login}},{getUserAction:function(e,t){return function(a){return fetch("/api/users/"+e,{method:"GET",headers:{"Content-type":"application/json",Accept:"application/json","x-access-token":t}}).then(function(e){return e.json()}).then(function(e){a({type:"GET_USER_ACTION",payload:e})}).catch(function(e){return console.error(e)})}},updateUserAction:function(e,t){return function(a){return fetch("/api/users",{method:"POST",headers:{"Content-type":"application/json",Accept:"application/json","x-access-token":t},body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(t){return a({type:"UPDATE_USER_ACTION",payload:e})}).catch(function(e){return console.error(e)})}}})(V),K=Object(s.b)(function(e){return{login:e.login}})(function(e){try{e.login.token="",e.login.email="",e.login.loggedIn=!1,sessionStorage.removeItem("userLoginToken")}catch(n){}var t=l.a.createElement("h3",null,"Logout Successful."),a=l.a.createElement("p",null,"Return ",l.a.createElement(F.a,{to:"/login"},"Login ",l.a.createElement("i",{className:"fa fa-user"}))," to edit User, or ",l.a.createElement(F.a,{to:"/signup"},"Signup ",l.a.createElement("i",{className:"fa fa-sign-in"}))," to create New User.");return l.a.createElement("div",{className:"signout"},l.a.createElement("h1",null,"Sign Out ",l.a.createElement("i",{className:"fa fa-sign-out"})),I(t,a))}),$=function(e,t){return function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return function(n){return fetch(e+a).then(function(e){return e.json()}).then(function(e){return n({type:t,payload:e})},function(e){return n({type:t+"_FAIL",error:e})})}}},Q=$("/api/list/page/","FETCH_USERS"),Y=$("/api/list/page/","PREV_USERS"),ee=$("/api/list/page/","NEXT_USERS"),te=function(){return function(e){return fetch("/api/list/total").then(function(e){return e.json()}).then(function(t){return e({type:"FETCH_TOTAL",payload:t})},function(t){return e({type:"FETCH_TOTAL_FAIL",error:t})})}},ae=function(e){return function(t){return fetch("/api/list/search/".concat(e)).then(function(e){return e.json()}).then(function(e){return t({type:"SEARCH_USERS",payload:e})},function(e){return t({type:"SEARCH_USERS_FAIL",error:e})})}},ne=function(e){return function(t){fetch("/api/list",{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){return t({type:"UPDATE_USER",payload:e})},function(e){return t({type:"UPDATE_USER_FAIL",error:e})})}},re=function(e){return function(t){return fetch("/api/list",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){return t({type:"ADD_USER",payload:e})},function(e){return t({type:"ADD_USER_FAIL",error:e})})}},le=function(e){return function(t){return fetch("/api/list",{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}).then(function(e){return 204===e.status&&"No Content"===e.statusText?"successful":e.json()}).then(function(a){return t({type:"DELETE_USER",payload:e})},function(e){return t({type:"DELETE_USER_FAIL",error:e})})}},oe=function(e,t){return{type:"SORT_USERS",sortBy:e,seq:t}},ce=a(154),ie=a.n(ce),se=a(35),ue=a(155),me=a.n(ue),pe=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(h.a)(this,Object(E.a)(t).call(this,e))).handleChange=a.handleChange.bind(Object(se.a)(Object(se.a)(a))),a.emitChangeDebounced=me()(a.emitChange,250),a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"componentWillUnmount",value:function(){this.emitChangeDebounced.cancel()}},{key:"render",value:function(){return l.a.createElement("div",{className:"input-group"},l.a.createElement("input",{type:"search",className:"form-control",placeholder:"Search...",name:"global_search",alt:"search all data source",onChange:this.handleChange}),l.a.createElement("div",{className:"input-group-btn"},l.a.createElement("button",{className:"btn btn-warning",type:"button"},l.a.createElement("i",{className:"fa fa-search-plus"}))))}},{key:"handleChange",value:function(e){this.emitChangeDebounced(e.target.value)}},{key:"emitChange",value:function(e){this.props.onChange(e)}}]),t}(l.a.Component),de=a(337),he=a(336),Ee=a(335),fe=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(h.a)(this,(e=Object(E.a)(t)).call.apply(e,[this].concat(r)))).field=function(e){var t=e.input,a=e.meta,n=e.options,r=t.name,o=t.onChange,c=a.touched,i=a.error,s=t.value,u=n.map(function(e,t){var a=e.label,n=e.value,c=s.includes(n);return l.a.createElement("label",{key:"checkbox-".concat(t)},l.a.createElement("input",{type:"checkbox",name:"".concat(r,"[").concat(t,"]"),value:n,checked:c,onChange:function(e){var t=Object(H.a)(s);return e.target.checked?t.push(n):t.splice(t.indexOf(n),1),o(t)}}),l.a.createElement("span",null,a))});return l.a.createElement("div",null,l.a.createElement("div",null,u),c&&i&&l.a.createElement("p",{className:"error"},i))},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return l.a.createElement(he.a,Object.assign({},this.props,{type:"checkbox",component:this.field}))}}]),t}(r.Component),ge=function(e){if(e&&e.input&&e.options){return l.a.createElement("div",{className:"radio"},l.a.createElement("label",null,e.label),l.a.createElement("div",null,e.options&&e.options.map(function(t,a){return l.a.createElement("label",{key:"".concat(a),htmlFor:"".concat(e.input.name,"-").concat(a)},l.a.createElement(he.a,{id:"".concat(e.input.name,"-").concat(a),component:"input",name:e.input.name,type:"radio",value:t}),t)})))}return l.a.createElement(r.Fragment,null)},be=function(e){return e&&e.options?l.a.createElement("div",null,l.a.createElement("label",null,e.label),l.a.createElement("select",e.input,l.a.createElement("option",{value:""},"-- location --"),Object.keys(e.options).map(function(t,a){return l.a.createElement("option",{key:"".concat(a,"-").concat(t),value:t},e.options[t])}))):l.a.createElement(r.Fragment,null)},ve=function(e){var t=e.input,a=e.label,n=e.type,r=e.meta,o=r.touched,c=r.error;return l.a.createElement("div",{className:"input-row"},l.a.createElement("label",null,a),l.a.createElement("div",null,l.a.createElement("input",Object.assign({},t,{placeholder:a,type:n})),o&&c&&l.a.createElement("span",null,c)))},Se=Object(s.b)(function(e,t){return{initialValues:t.user}})(Object(Ee.a)({form:"user-login-form",validate:function(e){var t={};return e.firstName||(t.firstName="Required"),e.lastName||(t.lastName="Required"),e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",t}})(function(e){var t=e.handleSubmit,a=e.pristine,n=e.reset,r=e.submitting;return l.a.createElement("div",{className:"row",style:{marginTop:40,paddingLeft:40}},l.a.createElement("form",{onSubmit:t},l.a.createElement(he.a,{name:"firstName",component:ve,type:"text",label:"First Name"}),l.a.createElement(he.a,{name:"lastName",component:ve,type:"text",label:"Last Name"}),l.a.createElement(he.a,{name:"email",component:ve,type:"email",label:"Email"}),l.a.createElement(he.a,{name:"password",component:ve,type:"password",label:"Password"}),l.a.createElement(fe,{name:"team",options:[{label:"Development Team",value:"Development Team"},{label:"Support_Group",value:"Support_Group"},{label:"Admin",value:"Admin"}]}),l.a.createElement(he.a,{name:"role",component:ge,label:"Role",options:["Scrum Master","Project Manager","Business Analyst"]}),l.a.createElement(he.a,{name:"location",component:be,label:"Location",options:{HK:"HK",GZ:"GZ",XA:"XA",Other:"Other"}}),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"comment"},"Comment"),l.a.createElement("div",null,l.a.createElement(he.a,{name:"comment",component:"textarea"}))),l.a.createElement("div",null,l.a.createElement("button",{type:"submit",className:"btn btn-primary",disabled:a||r},"Update"),l.a.createElement("button",{type:"button",className:"btn btn-warning",disabled:a||r,onClick:n},"Clear Values"))))})),ye=function(e){var t=e.show,a=e.close,n=e.onUpdate,r=e.user;return l.a.createElement(de.a,{show:t,className:t?"show":"",onHide:a},l.a.createElement(de.a.Header,{closeButton:!0},l.a.createElement(de.a.Title,null,r.email?r.email:"Add User")),l.a.createElement(de.a.Body,null,l.a.createElement(Se,{onSubmit:n,user:r})),l.a.createElement(de.a.Footer,null,l.a.createElement(T.a,{onClick:a},"Close")))},Ne=function(e){var t=e.sort,a=e.name;return l.a.createElement("button",{type:"button",title:"sort by "+a,className:"link-button",onClick:function(){return t(a,"asc")}},l.a.createElement("i",{className:"fa fa-sort-up fa-lg"}))},Oe=function(e){var t=e.sort,a=e.name;return l.a.createElement("button",{type:"button",title:"sort by "+a+" desc",className:"link-button",onClick:function(){return t(a,"desc")}},l.a.createElement("i",{className:"fa fa-sort-down fa-lg"}))},_e=function(e){var t=e.onOpen;return l.a.createElement("button",{className:"btn btn-success",onClick:t},l.a.createElement("i",{className:"fa fa-user-plus"}),"Add User")},Ce=function(e){var t=e.name,a=e.onSearch;return l.a.createElement("div",{className:"input-group"},l.a.createElement("input",{type:"search",className:"form-control",placeholder:t,name:"field_search",title:"search in this page",onChange:function(e){return a(e,t)}}))};Ce=Object(s.b)(function(e){return{userList:e.userList}},{getUsers:Q})(Ce);var je=function(e){var t=e.sort,a=e.onSearch;return l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"#"),l.a.createElement("th",null,l.a.createElement("label",null,"First Name"),l.a.createElement(Ne,{sort:t,name:"firstName"}),l.a.createElement(Oe,{sort:t,name:"firstName"}),l.a.createElement(Ce,{onSearch:a,name:"firstName"})),l.a.createElement("th",null,l.a.createElement("label",null,"Last Name"),l.a.createElement(Ne,{sort:t,name:"lastName"}),l.a.createElement(Oe,{sort:t,name:"lastName"}),l.a.createElement(Ce,{onSearch:a,name:"lastName"})),l.a.createElement("th",null,l.a.createElement("label",null,"Email"),l.a.createElement(Ne,{sort:t,name:"email"}),l.a.createElement(Oe,{sort:t,name:"email"}),l.a.createElement(Ce,{onSearch:a,name:"email"})),l.a.createElement("th",null,l.a.createElement("label",null,"Team"),l.a.createElement(Ne,{sort:t,name:"team"}),l.a.createElement(Oe,{sort:t,name:"team"}),l.a.createElement(Ce,{onSearch:a,name:"team"})),l.a.createElement("th",null,l.a.createElement("label",null,"Role"),l.a.createElement(Ne,{sort:t,name:"role"}),l.a.createElement(Oe,{sort:t,name:"role"}),l.a.createElement(Ce,{onSearch:a,name:"role"})),l.a.createElement("th",null,l.a.createElement("label",null,"Location"),l.a.createElement(Ne,{sort:t,name:"location"}),l.a.createElement(Oe,{sort:t,name:"location"}),l.a.createElement(Ce,{onSearch:a,name:"location"})),l.a.createElement("th",null,l.a.createElement("label",null,"Comment"),l.a.createElement(Ne,{sort:t,name:"comment"}),l.a.createElement(Oe,{sort:t,name:"comment"}),l.a.createElement(Ce,{onSearch:a,name:"comment"})),l.a.createElement("th",null,l.a.createElement("label",null,"TS"),l.a.createElement(Ne,{sort:t,name:"timestamp"}),l.a.createElement(Oe,{sort:t,name:"timestamp"}),l.a.createElement(Ce,{onSearch:a,name:"timestamp"})),l.a.createElement("th",null,"Operation")))},Ae=function(e){var t=e.idx,a=e.user,n=e.onEdit,r=e.onDelete,o=a.firstName,c=a.lastName,i=a.email,s=o&&c?o+" "+c:i;return l.a.createElement("tr",null,l.a.createElement("td",null,t+1),l.a.createElement("td",null,o),l.a.createElement("td",null,c),l.a.createElement("td",null,l.a.createElement("button",{onClick:function(){return n(a._id)}},i)),l.a.createElement("td",null,a.team.join(", ")),l.a.createElement("td",null,a.role),l.a.createElement("td",null,a.location),l.a.createElement("td",null,a.comment),l.a.createElement("td",null,a.timestamp.slice(0,10).replace(/-/g,"/")),l.a.createElement("td",null,l.a.createElement("button",{className:"btn btn-warning",onClick:function(){return n(a._id)},title:"eidt ".concat(s)},l.a.createElement("i",{className:"fa fa-edit"})),l.a.createElement("button",{className:"btn btn-danger",onClick:function(){return r(a._id)},title:"remove  ".concat(s)},l.a.createElement("i",{className:"fa fa-trash"}))))},Ue=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(h.a)(this,(e=Object(E.a)(t)).call.apply(e,[this].concat(r)))).state={showModal:!1,user:{},curr_page:1,total_page:1,total_users:0,search_value:"",search_field:"",done:!1},a.prev=function(){var e=a.state.curr_page;e>1?(e-=1,a.setState({curr_page:e}),a.props.prevAction(e)):console.log("current page: "+e+", cannot prev")},a.next=function(){var e=a.state.curr_page;e<a.state.total_page?(e+=1,a.setState({curr_page:e}),a.props.nextAction(e)):console.log("current page: "+e+", cannot next")},a.open=function(){a.setState({showModal:!0})},a.close=function(){a.setState({showModal:!1,user:{}})},a.doUser=function(e){if(R(e,a.state.user))return console.log("doUser - nothing change: values === this.state.user"),a.setState({showModal:!1,user:{}}),!1;0===Object.keys(a.state.user).length?a.props.saveUser(e):a.props.updateUser(e),a.setState({showModal:!1,user:{}})},a.editModal=function(e){var t=a.props.userList.find(function(t){return t._id===e});a.setState({user:t,showModal:!0})},a.updateTotal=function(){var e=a.props.total,t=e.total,n=e.limit;a.setState({total_users:t,total_page:Math.ceil(t/n)})},a.deleteModal=function(e){var t=a.props.userList.find(function(t){return t._id===e}),n=a.displayInfo(t.firstName,t.lastName,t.email);window.confirm("Are you sure to delete "+n+"?")&&a.props.deleteUser({id:t._id,email:t.email}).then(a.props.getTotal).then(a.updateTotal)},a.handleSearch=function(e,t){var n=e.target.value;n?a.setState({search_value:n.trim().toLowerCase(),search_field:t}):a.setState({search_value:"",search_field:""}),e.preventDefault()},a.handleGlobalSearch=function(e){e?a.props.searchUsers(e).then(function(){return a.setState({done:!0})}):a.props.getUsers(a.state.curr_page)},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"displayInfo",value:function(e,t,a){return e&&t?e+" "+t:a}},{key:"componentDidMount",value:function(){this.props.getUsers(1),this.props.getTotal().then(this.updateTotal)}},{key:"render",value:function(){var e=this,t=this.props,a=t.userList,n=t.sortAction,r=this.state,o=r.search_value,c=r.search_field,i=[],s=0;if(c&&o)i=function(e,t,a){if("team"===t.toLowerCase()){var n=JSON.parse(JSON.stringify(e));return n.forEach(function(e){var t=e.team.filter(function(e){return-1!==e.toLowerCase().indexOf(a)});e.team=t}),n.filter(function(e){return e.team.length>0})}return e.filter(function(e){return e[t]&&-1!==e[t].toLowerCase().indexOf(a)})}(a,c,o);else{i=a;var u=this.props.total.limit?this.props.total.limit:6;s=(this.state.curr_page-1)*u}return k(a)&&!this.state.done?l.a.createElement("div",{className:"loader"}):l.a.createElement("div",{className:"container",style:{paddingTop:48}},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-2"},l.a.createElement(_e,{onOpen:this.open})),l.a.createElement("div",{className:"col-md-3"},l.a.createElement(pe,{onChange:this.handleGlobalSearch})),l.a.createElement("div",{className:"col-md-2"},l.a.createElement("button",{type:"button",className:"link-button","aria-label":"Previous",onClick:this.prev},l.a.createElement("i",{className:"fa fa-backward"},"Prev"))),l.a.createElement("div",{className:"col-md-2"},l.a.createElement("button",{type:"button",className:"link-button","aria-label":"Next",onClick:this.next},l.a.createElement("i",{className:"fa fa-forward"},"Next"))),l.a.createElement("div",null,l.a.createElement("span",null,"Page ",l.a.createElement("strong",null,this.state.curr_page)," of ",l.a.createElement("strong",null,this.state.total_page),", total ",l.a.createElement("strong",null,this.state.total_users)," users"))),l.a.createElement("div",{className:"row",style:{paddingTop:10}},l.a.createElement("table",{className:"table table-bordered"},l.a.createElement(je,{sort:n,onSearch:this.handleSearch}),l.a.createElement("tbody",null,i.map(function(t,a){return l.a.createElement(Ae,{key:a+s,onEdit:e.editModal,onDelete:e.deleteModal,user:t,idx:a+s})})))),l.a.createElement("div",{className:"modal-123"},l.a.createElement(ye,{show:this.state.showModal,close:this.close,onUpdate:this.doUser,user:this.state.user})))}}]),t}(r.Component),Te={Login:w,Signup:G,Users:W,List:Object(s.b)(function(e,t){return{userList:e.userList,total:e.total}},function(e){var t=Object(i.b)(n,e);return Object(M.a)({},t,{dispatch:e})})(Ue),Logout:K},Le=(a(326),function(){return l.a.createElement(g.a,null,l.a.createElement(b.a,{exact:!0,path:"/",component:Te.List}),l.a.createElement(b.a,{path:"/login",component:Te.Login}),l.a.createElement(b.a,{path:"/signup",component:Te.Signup}),l.a.createElement(b.a,{path:"/list",component:Te.List}),l.a.createElement(b.a,{path:"/users/:email",exact:!0,strict:!0,component:Te.Users}),l.a.createElement(b.a,{path:"/users",component:Te.List}),l.a.createElement(b.a,{path:"/logout",component:Te.Logout}),l.a.createElement(b.a,{render:function(e){e.match;return l.a.createElement(v.a,{to:"/"})}}))}),we=function(e){function t(){return Object(p.a)(this,t),Object(h.a)(this,Object(E.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return l.a.createElement(S.a,null,l.a.createElement("div",{className:"App container"},l.a.createElement(y,null),l.a.createElement(_,null),l.a.createElement(Le,null),l.a.createElement(N,null)))}}]),t}(r.Component),ke=a(157),Ie=a.n(ke),Re=a(339),Fe=Object(i.c)({login:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_ACTION_SUCCESS":var a=t.payload;return{token:a,email:Ie()(a).email,loggedIn:!0};case"LOGIN_ACTION_FAIL":case"LOGOUT_ACTION":return Object(M.a)({},t.payload,{loggedIn:!1});default:return e}},signup:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SIGNUP_ACTION_SUCCESS":case"SIGNUP_ACTION_FAIL":return t.payload;default:return e}},user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_USER_ACTION":case"UPDATE_USER_ACTION":return t.payload;default:return e}},total:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_TOTAL":return t.payload;case"FETCH_TOTAL_FAIL":return t.error;default:return e}},userList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_USERS":case"LOAD_USERS":case"PREV_USERS":case"NEXT_USERS":return t.payload;case"FETCH_USERS_FAIL":case"LOAD_USERS_FAIL":case"PREV_USERS_FAIL":case"NEXT_USERS_FAIL":return t.error;case"SORT_USERS":return ie()(e,[t.sortBy],[t.seq]);case"UPDATE_USER":return e.map(function(e){return e._id===t.payload._id?t.payload:e});case"UPDATE_USER_FAIL":return t.error;case"ADD_USER":return[t.payload].concat(e);case"DELETE_USER":return console.log(t),e.filter(function(e){return e._id!==t.payload.id});case"DELETE_USER_FAIL":return console.error(t.error),e;case"SEARCH_USERS":return t.payload;case"SEARCH_USERS_FAIL":return t.error;default:return e}},form:Re.a});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var xe=Object(i.e)(Fe,Object(i.d)(Object(i.a)(u.a,Object(m.createLogger)())));c.a.render(l.a.createElement(s.a,{store:xe},l.a.createElement(we,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[160,1,2]]]);
//# sourceMappingURL=main.ef2109f1.chunk.js.map