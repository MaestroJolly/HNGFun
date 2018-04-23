/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojdatasource-common"],function(e,t){e.JsonNodeSet=function(t,r,n,i,o){e.Assert.assertNumber(t,null),e.Assert.assertNumber(r,null),this.m_depth=o,this.m_key=i,this.m_startNode=t,this.m_endNode=r,this.m_nodes=n},e.JsonNodeSet.prototype.getParent=function(){return this.m_key},e.JsonNodeSet.prototype.getStart=function(){return this.m_startNode},e.JsonNodeSet.prototype.getCount=function(){return Math.max(0,this.m_endNode-this.m_startNode)},e.JsonNodeSet.prototype.getData=function(t){return e.Assert.assert(t<=this.m_endNode&&t>=this.m_startNode),t-=this.m_startNode,this.m_nodes[t]?this.m_nodes[t].attr:null},e.JsonNodeSet.prototype.getMetadata=function(t){var r={leaf:!1,depth:-1};return e.Assert.assert(t<=this.m_endNode&&t>=this.m_startNode),t-=this.m_startNode,r.key=this.m_nodes[t].id?this.m_nodes[t].id:this.m_nodes[t].attr.id,r.leaf=this.m_nodes[t].leaf,r.depth=this.m_nodes[t].depth,null==r.leaf&&(this.m_nodes[t].children&&this.m_nodes[t].children.length>0?r.leaf=!1:r.leaf=!0),r},e.JsonNodeSet.prototype._updateDepth=function(e,t){var r;if(t++,e.depth=t,e.children&&0!=e.children.length)for(r=0;r<e.children.length;r++)this._updateDepth(e.children[r],t)},e.JsonNodeSet.prototype.getChildNodeSet=function(t){var r,n,i,o;if(e.Assert.assert(t<=this.m_endNode&&t>=this.m_startNode),t-=this.m_startNode,i=this.m_nodes[t].depth,null==(r=this.m_nodes[t].children)||0==r.length)return null;for(n=this.m_nodes[t].id?this.m_nodes[t].id:this.m_nodes[t].attr.id,o=0;o<r.length;o++)this._updateDepth(r[o],i);return new e.JsonNodeSet(0,r.length,r,n,0)},e._JsonTreeNodeDataSource=function(){this.id=null,this.depth=0,this.parent=null,this.children=null,this.title=null,this.attr=null,this.leaf=null},e._JsonTreeNodeDataSource.prototype._ascending=function(e){return function(t,r){return null!=t.attr&&null!=r.attr&&null!=t.attr[e]&&null!=r.attr[e]?t.attr[e]<r.attr[e]?-1:t.attr[e]===r.attr[e]?0:1:t[e]<r[e]?-1:t[e]===r[e]?0:1}},e._JsonTreeNodeDataSource.prototype._descending=function(e){return function(t,r){return null!=t.attr&&null!=r.attr&&null!=t.attr[e]&&null!=r.attr[e]?t.attr[e]<r.attr[e]?1:t.attr[e]===r.attr[e]?0:-1:t[e]<r[e]?1:t[e]===r[e]?0:-1}},e._JsonTreeNodeDataSource.prototype._sortRecursive=function(e){var t=e.key;if(null==this.children)return this;"ascending"===e.direction?this.children.sort(this._ascending(t)):"descending"===e.direction&&this.children.sort(this._descending(t));for(var r=0,n=this.children.length;r<n;r++)this.children[r]._sortRecursive(e);return this},e.JsonTreeDataSource=function(t){var r;r=new e._JsonTreeNodeDataSource,null==t.id&&(r.id="root"),this.data=this._createTreeDataSource({count:0},r,t),e.JsonTreeDataSource.superclass.constructor.call(this,r)},e.Object.createSubclass(e.JsonTreeDataSource,e.TreeDataSource,"oj.JsonTreeDataSource"),e.JsonTreeDataSource.prototype.Init=function(){e.JsonTreeDataSource.superclass.Init.call(this)},e.JsonTreeDataSource.prototype._createTreeDataSource=function(t,r,n,i){var o,l,s,d,a,h,c;for(d in null==i&&(i=0),n)if("children"==d||0==i&&n instanceof Array)for(o=0==i&&n instanceof Array?n:n[d],r.children=[],i++,c=0;c<o.length;c++){for(a in s=o[c],l=new e._JsonTreeNodeDataSource,null==s.id&&(t.count++,null==s.attr?l.id="rid_"+t.count:null==s.attr.id&&(s.attr.id="rid_"+t.count)),s)for(h in l)a==h&&"children"!=a&&(l[h]=s[a]),"depth"==h&&(l[h]=i);for(h in r.children.push(l),s)"children"==h&&this._createTreeDataSource(t,r.children[c],s,i)}return r},e.JsonTreeDataSource.prototype.getChildCount=function(e){var t;return null==e&&(e=this.data.id),(t=this._searchTreeById(this.data,e)).children?t.children.length:0},e.JsonTreeDataSource.prototype.fetchChildren=function(t,r,n,i){var o,l,s,d,a,h,c,u;for(0,0,a=[],null==t&&(t=this.data.id),c=null!=(h=this._searchTreeById(this.data,t)).children?h.children.length:0,r||((r=[]).start=0,r.count=c),r.count||(r.count=c),r.start||(r.start=0),l=r.start,s=Math.min(c,l+r.count),o=l;o<s;o+=1)u=new e._JsonTreeNodeDataSource,null!=h.children[o].attr&&(u.attr=h.children[o].attr),null!=h.children[o].id&&(u.id=h.children[o].id),null!=h.children[o].depth&&(u.depth=h.children[o].depth),null!=h.children[o].title&&(u.title=h.children[o].title),null!=h.children[o].parent&&(u.parent=h.children[o].parent),null!=h.children[o].children?u.leaf=!1:u.leaf=!0,a.push(u);d=new e.JsonNodeSet(l,s,a,t,h.depth),null!=n&&null!=n.success&&n.success.call(null,d)},e.JsonTreeDataSource.prototype.fetchDescendants=function(t,r,n){var i,o,l,s,d,a,h,c;for(0,0,a=[],null==t&&(t=this.data.id),c=null!=(h=this._searchTreeById(this.data,t)).children?h.children.length:0,(i=[]).start=0,i.count=c,l=i.start,s=Math.min(c,l+i.count),o=l;o<s;o+=1)null!=h.children[o].children?h.children[o].leaf=!1:h.children[o].leaf=!0,a.push(h.children[o]);d=new e.JsonNodeSet(0,a.length,a,t,h.depth),null!=r&&null!=r.success&&r.success.call(null,d)},e.JsonTreeDataSource.prototype.moveOK=function(e,t,r){return"valid"},e.JsonTreeDataSource.prototype.move=function(t,r,n,i){var o,l,s,d,a,h,c;if(a=n,s=t,null==(d=r)||d==this.data.id){if("inside"!=a)return void e.Logger.log("Error: root can not be the reference node if position equals to "+a);d||(d=this.data.id)}o=this._searchTreeById(null,s),this._searchTreeById(o,d)?e.Logger.log("Error: the node to move contains the reference node as its sub-tree."):(l=this._searchTreeById(null,d),h=this._getParentById(d),this._removeFromTree(o),"inside"==a?(this._updateDepth(o,o.depth-(l.depth+1)),null==l.children&&(l.children=[]),l.children.push(o)):"before"==a?(this._updateDepth(o,o.depth-l.depth),(c=h.children.indexOf(l))>-1&&(0!=c?h.children.splice(c,0,o):h.children.unshift(o))):"after"==a?(this._updateDepth(o,o.depth-l.depth),(c=h.children.indexOf(l))>-1&&h.children.splice(c+1,0,o)):"first"==a?(this._updateDepth(o,o.depth-l.depth),h.children.unshift(o)):"last"==a&&(this._updateDepth(o,o.depth-l.depth),h.children.push(o)),null!=i&&null!=i.success&&i.success.call(null,this.data))},e.JsonTreeDataSource.prototype.sort=function(e,t){var r,n;n=this.data.id,(r=this._searchTreeById(this.data,n))._sortRecursive(e),null!=t&&null!=t.success&&t.success.call(null,r)},e.JsonTreeDataSource.prototype.getSortCriteria=function(){return{key:null,direction:"none"}},e.JsonTreeDataSource.prototype._getParentById=function(e,t){var r,n=null,i=!1;if(e==this.data.id)return null;if(null==t&&(t=this.data),t.children&&t.children.length>0){for(r=0;r<t.children.length;r++)if(t.children[r].id&&t.children[r].id==e||t.children[r].attr&&t.children[r].attr.id==e)return i=!0,t;if(!i)for(r=0;r<t.children.length;r++)if(n=this._getParentById(e,t.children[r]))return i=!0,n}return n},e.JsonTreeDataSource.prototype._searchTreeById=function(e,t){var r,n=null;if(null==e&&(e=this.data),e.id&&e.id==t||e.attr&&e.attr.id==t)return e;if(null!=e.children){for(r=0;r<e.children.length;r++){if(n)return n;n=e.children[r].id&&e.children[r].id==t||e.children[r].attr&&e.children[r].attr.id==t?e.children[r]:this._searchTreeById(e.children[r],t)}return n}return n},e.JsonTreeDataSource.prototype._updateDepth=function(e,t){var r;if(e.depth=e.depth-t,e.children&&0!=e.children.length)for(r=0;r<e.children.length;r++)this._updateDepth(e.children[r],t)},e.JsonTreeDataSource.prototype._removeFromTree=function(e){var t,r,n;null!=e.id?n=e.id:null!=e.attr&&(n=e.attr.id),(t=this._getParentById(n))||(t=this.data),(r=t.children.indexOf(e))>-1&&t.children.splice(r,1)},e.JsonTreeDataSource.prototype.getCapability=function(e){return"fetchDescendants"===e?"enable":"sort"===e?"default":"batchFetch"===e?"disable":"move"===e?"full":null}});