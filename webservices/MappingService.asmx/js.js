Type.registerNamespace('webOutput.webservices');
webOutput.webservices.MappingService=function() {
webOutput.webservices.MappingService.initializeBase(this);
this._timeout = 0;
this._userContext = null;
this._succeeded = null;
this._failed = null;
}
webOutput.webservices.MappingService.prototype={
_get_path:function() {
 var p = this.get_path();
 if (p) return p;
 else return webOutput.webservices.MappingService._staticInstance.get_path();},
Initialize:function(json,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'Initialize',false,{json:json},succeededCallback,failedCallback,userContext); },
GetObject:function(json,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetObject',false,{json:json},succeededCallback,failedCallback,userContext); },
GetFeedReaderOptions:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetFeedReaderOptions',false,{},succeededCallback,failedCallback,userContext); },
GetRelated:function(request,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetRelated',false,{request:request},succeededCallback,failedCallback,userContext); },
GetSites:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetSites',false,{},succeededCallback,failedCallback,userContext); },
GetReportFile:function(json,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetReportFile',false,{json:json},succeededCallback,failedCallback,userContext); },
GetDataExport:function(json,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetDataExport',false,{json:json},succeededCallback,failedCallback,userContext); },
GetMappingDocuments:function(succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetMappingDocuments',false,{},succeededCallback,failedCallback,userContext); }}
webOutput.webservices.MappingService.registerClass('webOutput.webservices.MappingService',Sys.Net.WebServiceProxy);
webOutput.webservices.MappingService._staticInstance = new webOutput.webservices.MappingService();
webOutput.webservices.MappingService.set_path = function(value) { webOutput.webservices.MappingService._staticInstance.set_path(value); }
webOutput.webservices.MappingService.get_path = function() { return webOutput.webservices.MappingService._staticInstance.get_path(); }
webOutput.webservices.MappingService.set_timeout = function(value) { webOutput.webservices.MappingService._staticInstance.set_timeout(value); }
webOutput.webservices.MappingService.get_timeout = function() { return webOutput.webservices.MappingService._staticInstance.get_timeout(); }
webOutput.webservices.MappingService.set_defaultUserContext = function(value) { webOutput.webservices.MappingService._staticInstance.set_defaultUserContext(value); }
webOutput.webservices.MappingService.get_defaultUserContext = function() { return webOutput.webservices.MappingService._staticInstance.get_defaultUserContext(); }
webOutput.webservices.MappingService.set_defaultSucceededCallback = function(value) { webOutput.webservices.MappingService._staticInstance.set_defaultSucceededCallback(value); }
webOutput.webservices.MappingService.get_defaultSucceededCallback = function() { return webOutput.webservices.MappingService._staticInstance.get_defaultSucceededCallback(); }
webOutput.webservices.MappingService.set_defaultFailedCallback = function(value) { webOutput.webservices.MappingService._staticInstance.set_defaultFailedCallback(value); }
webOutput.webservices.MappingService.get_defaultFailedCallback = function() { return webOutput.webservices.MappingService._staticInstance.get_defaultFailedCallback(); }
webOutput.webservices.MappingService.set_enableJsonp = function(value) { webOutput.webservices.MappingService._staticInstance.set_enableJsonp(value); }
webOutput.webservices.MappingService.get_enableJsonp = function() { return webOutput.webservices.MappingService._staticInstance.get_enableJsonp(); }
webOutput.webservices.MappingService.set_jsonpCallbackParameter = function(value) { webOutput.webservices.MappingService._staticInstance.set_jsonpCallbackParameter(value); }
webOutput.webservices.MappingService.get_jsonpCallbackParameter = function() { return webOutput.webservices.MappingService._staticInstance.get_jsonpCallbackParameter(); }
webOutput.webservices.MappingService.set_path("/webservices/MappingService.asmx");
webOutput.webservices.MappingService.Initialize= function(json,onSuccess,onFailed,userContext) {webOutput.webservices.MappingService._staticInstance.Initialize(json,onSuccess,onFailed,userContext); }
webOutput.webservices.MappingService.GetObject= function(json,onSuccess,onFailed,userContext) {webOutput.webservices.MappingService._staticInstance.GetObject(json,onSuccess,onFailed,userContext); }
webOutput.webservices.MappingService.GetFeedReaderOptions= function(onSuccess,onFailed,userContext) {webOutput.webservices.MappingService._staticInstance.GetFeedReaderOptions(onSuccess,onFailed,userContext); }
webOutput.webservices.MappingService.GetRelated= function(request,onSuccess,onFailed,userContext) {webOutput.webservices.MappingService._staticInstance.GetRelated(request,onSuccess,onFailed,userContext); }
webOutput.webservices.MappingService.GetSites= function(onSuccess,onFailed,userContext) {webOutput.webservices.MappingService._staticInstance.GetSites(onSuccess,onFailed,userContext); }
webOutput.webservices.MappingService.GetReportFile= function(json,onSuccess,onFailed,userContext) {webOutput.webservices.MappingService._staticInstance.GetReportFile(json,onSuccess,onFailed,userContext); }
webOutput.webservices.MappingService.GetDataExport= function(json,onSuccess,onFailed,userContext) {webOutput.webservices.MappingService._staticInstance.GetDataExport(json,onSuccess,onFailed,userContext); }
webOutput.webservices.MappingService.GetMappingDocuments= function(onSuccess,onFailed,userContext) {webOutput.webservices.MappingService._staticInstance.GetMappingDocuments(onSuccess,onFailed,userContext); }
var gtc = Sys.Net.WebServiceProxy._generateTypedConstructor;
Type.registerNamespace('ComponentArt.Web.UI');
if (typeof(ComponentArt.Web.UI.GridWebServiceSelectRequest) === 'undefined') {
ComponentArt.Web.UI.GridWebServiceSelectRequest=gtc("ComponentArt.Web.UI.GridWebServiceSelectRequest");
ComponentArt.Web.UI.GridWebServiceSelectRequest.registerClass('ComponentArt.Web.UI.GridWebServiceSelectRequest');
}
if (typeof(ComponentArt.Web.UI.GridWebServiceSelectResponse) === 'undefined') {
ComponentArt.Web.UI.GridWebServiceSelectResponse=gtc("ComponentArt.Web.UI.GridWebServiceSelectResponse");
ComponentArt.Web.UI.GridWebServiceSelectResponse.registerClass('ComponentArt.Web.UI.GridWebServiceSelectResponse');
}
