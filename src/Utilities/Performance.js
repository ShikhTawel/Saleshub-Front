export function getColor(performance) {
  if (performance == 'Bad') return 'red'
  else if (performance == 'Good') return 'blue'
  return 'green'
}

export function getPerformance(performance) {
  if (performance == 'Bad') return 'سيئ'
  else if (performance == 'Good') return 'جيد'
  return 'متوسط'
}
