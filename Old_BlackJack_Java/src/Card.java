
public class Card {
	
	private int value = 0;
	private int color = 0;
	private int symbol = 0;
	
	public Card(int value, int color, int symbol) {
		this.value = value;
		this.color = color;
		this.symbol = symbol;
	}
	
	@Override
	public String toString() {
		return "Value (" + value + ") - Color (" + color + ") - Symbol (" + symbol	 + ")";
	}
	
	public int getValue() {
		return value;
	}

	public int getSymbol() {
		return symbol;
	}
	
}
