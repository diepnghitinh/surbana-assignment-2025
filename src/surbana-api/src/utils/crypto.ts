import * as crypto from 'crypto';

export const sha256 = (content, salt) => {
  const hash = crypto.createHmac('sha256', salt);
  hash.update(content);
  const value = hash.digest('hex');
  return {
    salt: salt,
    passwordHash: value,
  };
};
