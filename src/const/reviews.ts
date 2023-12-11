import { SortReview } from '../store/review/types'

export const SORT_REVIEW: { label: string; value: SortReview }[] = [
  { label: 'Latest', value: SortReview.DATE_DESC },
  { label: 'Oldest', value: SortReview.DATE_ASC },
  { label: 'Low rating', value: SortReview.RATING_ASC },
  { label: 'High rating', value: SortReview.RATING_DESC },
  { label: 'Text(ASC)', value: SortReview.TEXT_ASC },
  { label: 'Text(Desc)', value: SortReview.TEXT_DESC },
]
