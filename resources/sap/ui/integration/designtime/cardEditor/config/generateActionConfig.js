/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_merge"],function(_){"use strict";return function(c){return _({},{"label":"{i18n>CARD_EDITOR.ACTIONS}","type":"array","itemLabel":"{type}","addItemLabel":"{i18n>CARD_EDITOR.ACTION}","template":{"enabled":{"label":"{i18n>CARD_EDITOR.ACTION.ENABLED}","type":"boolean","defaultValue":true,"path":"enabled"},"type":{"label":"{i18n>CARD_EDITOR.LABEL.TYPE}","type":"select","items":[{"key":"Navigation"}],"path":"type","visible":"{= !!${enabled}}"},"service":{"label":"{i18n>CARD_EDITOR.ACTION.SERVICE}","type":"string","path":"service","visible":false},"parameters":{"label":"{i18n>CARD_EDITOR.PARAMETERS}","type":"map","allowedTypes":["string","number","boolean"],"path":"parameters","visible":"{= !!${enabled}}"},"url":{"label":"{i18n>CARD_EDITOR.LABEL.URL}","type":"string","path":"url","visible":"{= !!${enabled} && ${type} === 'Navigation'}"},"target":{"label":"{i18n>CARD_EDITOR.TARGET}","type":"select","items":[{"key":"_blank","description":"{i18n>CARD_EDITOR.TARGET.BLANK}"},{"key":"_self","description":"{i18n>CARD_EDITOR.TARGET.SELF}"}],"defaultValue":"_blank","path":"target","visible":"{= !!${enabled} && ${type} === 'Navigation' && !!${url}}"}}},c);};});
