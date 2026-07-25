function permuteString(str, prefix="", results=[]) {
  if (str.length === 0) {
    if (!results.includes(prefix)){
      results.push(prefix);
    }
    return results;
  } else {
    for (let i= 0; i < str.length; i++) {
      let newStr = str.slice(0, i) + str.slice(i + 1);
      results = permuteString(newStr, prefix + str[i], results);
    }
    return results;
  }
}

console.log(permuteString("fcc"));