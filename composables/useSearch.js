const useSearch = () => {
  const searchQuery = useState('searchQuery', () => '')

  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  const clearSearch = () => {
    searchQuery.value = ''
  }

  return {
    searchQuery,
    setSearchQuery,
    clearSearch
  }
}

export default useSearch
