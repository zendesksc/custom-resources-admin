const slugify = (string) => {
  return string.toLowerCase().replace(/ /g, '-')
}

export default slugify