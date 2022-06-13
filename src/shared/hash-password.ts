import * as bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePasswords = async (plainTextPassword, hashedPassword) => {
  try {
    const b = await bcrypt.compare(plainTextPassword, hashedPassword);
    return b;
  } catch (e) {
    console.log(e);
    return false;
  }
};
