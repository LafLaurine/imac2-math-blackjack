import java.awt.BorderLayout;
import java.awt.Graphics;
import java.awt.Image;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class Overlay extends JFrame {
	
	public Overlay() {
	    this.setTitle("BlackJack");
 	    this.setSize(500, 500);
 	    JPanel bg = new JPanel()
 	    {
 	        protected void paintComponent(Graphics g) 
 	        {
 	            super.paintComponent(g);
 	            ImageIcon m = new ImageIcon(getClass().getResource("/bg.jpg"));
	            ImageIcon card = new ImageIcon(getClass().getResource("/Cards/Clubs/T1.png"));
 	            Image monImage = m.getImage();
 	            Image myCard = card.getImage();
 	            g.drawImage(monImage, 0, 0,this);
 	            g.drawImage(myCard, 0, 0,this);
 	        }
 	   	};
 	   	
 	    this.setLocationRelativeTo(null);               
 		bg.setLayout(new BorderLayout());
 		this.getContentPane().add(bg);
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
 	    this.setVisible(true);
	}
}
