import { SortReview } from '../store/review/types'

export const SORT: { text: string; value: SortReview }[] = [
  { text: 'Latest', value: SortReview.DATE_DESC },
  { text: 'Oldest', value: SortReview.DATE_ASC },
  { text: 'Low rating', value: SortReview.RATING_ASC },
  { text: 'High rating', value: SortReview.RATING_DESC },
  { text: 'Text(ASC)', value: SortReview.TEXT_ASC },
  { text: 'Text(Desc)', value: SortReview.TEXT_DESC },
]
