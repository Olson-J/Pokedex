import { render, screen } from '@/app/lib/test-utils'
import userEvent from '@testing-library/user-event'
import SearchInput from '@/app/components/SearchInput'

describe('SearchInput', () => {
  it('renders an input field with placeholder', () => {
    const onChange = jest.fn()
    render(<SearchInput value="" onChange={onChange} placeholder="Search Pokemon..." />)

    const input = screen.getByPlaceholderText('Search Pokemon...')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('calls onChange when user types', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()

    render(<SearchInput value="" onChange={onChange} placeholder="Search..." />)
    const input = screen.getByRole('textbox')

    await user.type(input, 'pikachu')
    // onChange should be called 7 times (once per character)
    expect(onChange).toHaveBeenCalledTimes(7)
    expect(onChange).toHaveBeenNthCalledWith(1, 'p')
    expect(onChange).toHaveBeenNthCalledWith(7, 'u')
  })

  it('displays the provided value', () => {
    const onChange = jest.fn()
    render(<SearchInput value="charizard" onChange={onChange} placeholder="Search..." />)

    const input = screen.getByDisplayValue('charizard')
    expect(input).toBeInTheDocument()
  })

  it('clears the search when clear button is clicked', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()

    render(<SearchInput value="bulbasaur" onChange={onChange} placeholder="Search..." />)

    const clearButton = screen.getByRole('button', { name: /clear|×/i })
    await user.click(clearButton)

    expect(onChange).toHaveBeenCalledWith('')
  })

  it('has appropriate styling classes', () => {
    const onChange = jest.fn()
    render(<SearchInput value="" onChange={onChange} placeholder="Search..." />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('px-4', 'py-2')
  })

  it('performs case-insensitive search (accepts any case input)', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()

    render(<SearchInput value="" onChange={onChange} placeholder="Search..." />)
    const input = screen.getByRole('textbox')

    await user.type(input, 'PiKaChU')
    // onChange should be called 7 times (once per character), and the last one should be 'U'
    expect(onChange).toHaveBeenCalledTimes(7)
    expect(onChange).toHaveBeenNthCalledWith(7, 'U')
  })
})
