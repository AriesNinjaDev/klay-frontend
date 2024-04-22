import React from"react";import styled,{css}from"styled-components";import{ChevronRight,LinkExternal}from"@styled-icons/boxicons-regular";var Base=styled.a.withConfig({displayName:"Base",componentId:"sc-j9ukbi-0"})(["padding:9.8px 12px;border-radius:var(--border-radius);margin-bottom:10px;color:var(--foreground);background:var(--secondary-header);gap:12px;display:flex;align-items:center;flex-direction:row;> svg{flex-shrink:0;}.content{display:flex;flex-grow:1;flex-direction:column;font-weight:600;font-size:0.875rem;.title{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;}.description{"," font-weight:400;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;color:var(--secondary-foreground);a:hover{text-decoration:underline;}}}"," ",""],function(a){return a.largeDescription?css(["font-size:0.875rem;"]):css(["font-size:0.6875rem;"])},function(a){return a.disabled?css(["opacity:0.4;.action{font-size:0.875rem;}"]):css(["cursor:pointer;opacity:1;transition:0.1s ease background-color;&:hover{background:var(--secondary-background);}"])},function(a){return a.account&&css(["height:54px;.content{text-overflow:ellipsis;overflow:hidden;white-space:nowrap;.title{text-transform:uppercase;font-size:0.75rem;color:var(--secondary-foreground);}.description{font-size:0.9375rem;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;}}"])});export function CategoryButton(a){var b=a.icon,c=a.children,d=a.description,e=a.account,f=a.disabled,g=a.onClick,h=a.action;return React.createElement(Base,{onClick:g,disabled:f,account:e},b,React.createElement("div",{className:"content"},React.createElement("div",{className:"title"},c),React.createElement("div",{className:"description"},d)),React.createElement("div",{className:"action"},"string"==typeof h?"chevron"===h?React.createElement(ChevronRight,{size:24}):React.createElement(LinkExternal,{size:20}):h))}