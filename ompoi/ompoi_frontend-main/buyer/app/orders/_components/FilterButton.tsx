import { Button } from '@/components/ui/button'
import clsx from 'clsx'

function FilterButton({ name, setFilter, isPressed }: { name: string, setFilter: (filter: string) => void, isPressed: boolean }) {
  return (
    <Button className={clsx("rounded-full text-sm font-bold hover:bg-green-500 hover:text-white", isPressed ? "bg-green-500 text-white" : "bg-white text-black")} variant="outline" aria-pressed={ isPressed } onClick={ () => setFilter(name) } >{ name }</Button>
  )
}

export default FilterButton