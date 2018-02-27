/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.auth.twofactor',
  name: 'AbstractTOTPAuthService',
  extends: 'foam.nanos.auth.twofactor.AbstractOTPAuthService',
  abstract: true,

  documentation: 'Abstract time-based one-time password auth service',

  javaImports: [
    'org.apache.commons.codec.binary.Base32',
    'java.util.Date'
  ],

  methods: [
    {
      name: 'checkCode',
      javaReturns: 'boolean',
      args: [
        {
          name: 'secret',
          javaType: 'String'
        },
        {
          name: 'code',
          javaType: 'long'
        },
        {
          name: 'stepsize',
          javaType: 'long'
        },
        {
          name: 'window',
          javaType: 'int'
        }
      ],
      javaCode:
`try {
  byte[] key = new Base32().decode(secret);
  long t = new Date().getTime() / stepsize;

  for (int i = -window; i <= window; ++i) {
    long hash = calculateCode(key, t + i);
    if (hash == code) {
      return true;
    }
  }

  return false;
} catch (Throwable t) {
  return false;
}`
    }
  ]
});