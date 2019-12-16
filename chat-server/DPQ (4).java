// Java implementation of Dijkstra's Algorithm 
// using Priority Queue 
import java.util.*; 
public class DPQ { 
	private Map<String,Double> dist; 
	private Map<String,Integer> stops; 
	private Set<String> settled; 
	private PriorityQueue<Node> pq; 
	private Map<String,String> p;
	private int V; // Number of vertices 
	private String sourceLessonLocation;
	private String destLessonLocation;
	private String outputString;
	private String busTaken;
	
	public DPQ() 
	{ 
		dist = new HashMap<String, Double>();
		stops = new HashMap<String, Integer>();
		p = new HashMap<String, String>();
		settled = new HashSet<String>(); 
		pq = new PriorityQueue<Node>(1, new Node()); 
		outputString = "";
		busTaken = "";
	} 

	// Function for Dijkstra's Algorithm 
	public void dijkstra(String src, String dest) 
	{ 
		this.sourceLessonLocation = src;
		this.destLessonLocation = dest;

		// Add source node to the priority queue 
		pq.add(new Node("Source",0.0)); 

		// Distance to the source is 0 
		dist.put("Source", 0.0); 
		stops.put("Source", 0); 
		while (!pq.isEmpty()) { 

			// remove the minimum distance node 
			// from the priority queue 
			Node u = pq.remove(); 

			// adding the node whose distance is 
			// finalized 
			settled.add(u.node); 

			e_Neighbours(u); 
		} 
	} 

	// Function to process all the neighbours 
	// of the passed node 
	public void e_Neighbours(Node u) 
	{ 
		double edgeDistance = -1.0; 
		double newDistance = -1.0; 

		if (!dist.containsKey(u.node)){
			dist.put(u.node, Double.MAX_VALUE);
		}
		if (!p.containsKey(u.node)){
			p.put(u.node, "-1");
		}
		if (!stops.containsKey(u.node)){
			stops.put(u.node, -1);
		}
		
		ArrayList<Node> neighbourList = new ArrayList<>();
		String[] buses = new String[]{"A1","A1E","A2","A2E","B1","B2","C","D1","D2","BTC1","BTC2"};
		
		if (u.node.equals("Source")){
			double walkingSpeedKMPerSecond = 0.0014;
			Inventory inv = lessonLocationToTop3BusStops(sourceLessonLocation);
			for (int i = 0; i < inv.getBusStopsNames().length; i++) {
				String[] busesList = getBusesAtBusStop(inv.getBusStopsNames()[i]);
				for (int j = 0; j < busesList.length; j++) {
					neighbourList.add(new Node(inv.getBusStopsNames()[i] + ";" + busesList[j], inv.getBusStopsCoordinates()[i] / walkingSpeedKMPerSecond));
				}
			}
			
			double[] uC = lessonLocationToCoordinates(sourceLessonLocation);
			double[] vC = lessonLocationToCoordinates(destLessonLocation);
			System.out.println(sourceLessonLocation);
			double distanceT = distance(uC[0], uC[1], vC[0], vC[1], "K");
			double timeTaken = distanceT / walkingSpeedKMPerSecond;
				
			if (distanceT < 0.2){
				neighbourList.add(new Node("Destination", timeTaken));
			}
			
		} else if (u.node.equals("Destination")){
			return;
		} else {
			String busStop = u.node.split(";")[0];
			String bus = u.node.split(";")[1];
			
			String nextBusStop = getNextBusStop(busStop, bus);
			if (nextBusStop.equals("")){
				return;
			} else {
				double busSpeedKMPerSecond = 0.0024688;
				double walkingSpeedKMPerSecond = 0.0014;
				double[] uC = busStopToCoordinates(busStop);
				double[] vC = busStopToCoordinates(nextBusStop);
				//System.out.println("Checking " + vC[0]);
				double distanceT = distance(uC[0], uC[1], vC[0], vC[1], "K");
				double timeTaken = distanceT / busSpeedKMPerSecond;
				
				neighbourList.add(new Node(nextBusStop + ";" + bus, timeTaken));
				
				Inventory inv = lessonLocationToTop3BusStops(destLessonLocation);
				for (int i = 0; i < inv.getBusStopsNames().length; i++) {
					if (busStop.equals(inv.getBusStopsNames()[i])){
						neighbourList.add(new Node("Destination", inv.getBusStopsCoordinates()[i] / walkingSpeedKMPerSecond));
					}
				}
			
			}
		}
		
		// All the neighbors of v 
		for (int i = 0; i < neighbourList.size(); i++) { 
			Node v = neighbourList.get(i);
			if (!dist.containsKey(v.node)){
				dist.put(v.node, Double.MAX_VALUE);
			}
			if (!p.containsKey(v.node)){
				p.put(v.node, "-1");
			}
			if (!stops.containsKey(v.node)){
				stops.put(v.node, -1);
			}
			System.out.println(u.node + ";" + v.node + ";" + dist.get(u.node) + ";" + dist.get(v.node));
			// If current node hasn't already been processed 
			if (!settled.contains(v.node)) { 
				edgeDistance = v.weight;
				newDistance = dist.get(u.node) + edgeDistance; 
				
				// If new distance is cheaper in weight 
				if (newDistance < dist.get(v.node)) {
					dist.put(v.node, newDistance); 
					p.put(v.node, u.node);
					stops.put(v.node, stops.get(u.node) + 1);
				} else if (newDistance == dist.get(v.node)) {
					if (stops.get(u.node) + 1 < stops.get(v.node)){
						dist.put(v.node, newDistance); 
						p.put(v.node, u.node);
						stops.put(v.node, stops.get(u.node) + 1);
					}
				}
				// Add the current node to the queue 
				pq.add(new Node(v.node, dist.get(v.node))); 
			} 
		} 
	} 

	public static void backtrack(String u, DPQ dpq) {
		if (u.equals("-1") || !dpq.p.containsKey(u)){
			// recall: predecessor of s is -1
			return;
		} else {
			backtrack(dpq.p.get(u), dpq);
			
			String s = "";
			if (u.equals("Source")){
				s = dpq.sourceLessonLocation;
			} else if (u.equals("Destination")){
				s = dpq.destLessonLocation;
			} else {
				s = u.split(";")[0];
				if (!u.split(";")[1].equals("")){
					dpq.busTaken = u.split(";")[1];
				}
			}
			dpq.outputString += s + ",";
		}
	}
	
	// Driver code 
	public static void main(String arg[]) 
	{ 
		// Adjacency list representation of the 
		// connected edges 
		// Calculate the single source shortest path 
		DPQ dpq = new DPQ(); 
		
		//SNOW
		dpq.dijkstra("E2", "S17"); 

		// Print the shortest path to all the nodes 
		// from the source node 
		backtrack("Destination", dpq);
		System.out.println("The shortest path from " + dpq.sourceLessonLocation + " to " + dpq.destLessonLocation + "(Bus Taken: " + dpq.busTaken + "): "); 
		System.out.println(dpq.dist.get("Destination"));
		System.out.println(dpq.outputString.substring(0, dpq.outputString.length() - 1));
	} 
	
	

	public double calculateDistanceBetweenPointsWithHypot(double x1, double x2, double y1, double y2) {
	    double ac = Math.abs(y2 - y1);
	    double cb = Math.abs(x2 - x1);
	         
	    return Math.hypot(ac, cb);
	}
	
	private static double distance(double lat1, double lon1, double lat2, double lon2, String unit) {
		if ((lat1 == lat2) && (lon1 == lon2)) {
			return 0;
		}
		else {
			double theta = lon1 - lon2;
			double dist = Math.sin(Math.toRadians(lat1)) * Math.sin(Math.toRadians(lat2)) + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.cos(Math.toRadians(theta));
			dist = Math.acos(dist);
			dist = Math.toDegrees(dist);
			dist = dist * 60 * 1.1515;
			if (unit.equals("K")) {
				dist = dist * 1.609344;
			} else if (unit.equals("N")) {
				dist = dist * 0.8684;
			}
			return (dist);
		}
	}
	
	public String[] getBusesAtBusStop(String busStop){
		String[] buses = new String[]{"AS5;A1","AS5;D1","AS5;B1","AS5;BTC1","BIZ2;A1","BIZ2;D1","BIZ2;B1","BIZ2;BTC1","BIZ2;A1E","BGMRT;BTC2","OTHBldg;BTC2","CLB;A1","CLB;D1","CLB;B1","CLB;BTC1","CLB;A1E","CollegeGreen;BTC1","COM2;A1","COM2;A2","COM2;D1","EA;B2","EA;BTC2","EA;C","IT;A2","IT;D1","IT;B1","IT;B2","IT;A2E","KRBusTerminal;B1","KRBusTerminal;BTC1","KRBusTerminal;C","KRMRT;A1","KRMRT;D2","KRMRT;A1E","KV;BTC1","KV;C","LT13;A1","LT13;D1","LT13;B1","LT13;BTC1","LT27;A1","LT27;D2","LT27;A1E","LT27;C","Museum;A2","Museum;D1","Museum;D2","Museum;BTC1","Museum;BTC2","Museum;C","OppHSSML;A2","OppHSSML;D1","OppHSSML;B2","OppKRMRT;A2","OppKRMRT;D2","OppKRMRT;A2E","OppNUSS;A2","OppNUSS;D1","OppNUSS;B2","OppTCOMS;A1","OppTCOMS;D2","OppUHALL;A2","OppUHALL;D2","OppUHALL;C","OppUHC;A1","OppUHC;D2","OppUHC;A1E","OppUHC;C","OppYIH;A2","OppYIH;D1","OppYIH;B1","OppYIH;B2","PGPHse15;A2","PGP7;A1","PGP;A1","PGP;A2","PGP;D2","PGP;BTC1","PGP;A1E","PGPR;D2","RafflesHall;B2","RafflesHall;C","S17;A2","S17;D2","S17;A2E","S17;C","TCOMS;A2","TCOMS;D2","JapaneseSch;C","UHall;A1","UHall;D2","UHall;C","UHC;A2","UHC;D2","UHC;C","UTown;D1","UTown;D2","UTown;B1","UTown;B2","UTown;C","Ventus;A2","Ventus;D1","Ventus;B2","Ventus;A2E","YIH;A1","YIH;D1","YIH;B1"};
		List<String> outputBuses = new ArrayList<>();
		
		for (int i = 0; i < buses.length; i++){
			String tbusStop = buses[i].split(";")[0];
			String tbus = buses[i].split(";")[1];
			if (tbusStop.equals(busStop)){
				outputBuses.add(tbus);
			}
		}
		
		String[] out = outputBuses.toArray(new String[0]);
		return out;
	}
	
	public static String getNextBusStop(String busStop, String bus){
		Map<String, String[]> hm = new HashMap<String, String[]>() {{
        put("A1", new String[]{"PGP","KRMRT","LT27","UHall","OppUHC","YIH","CLB","LT13","AS5","COM2","BIZ2","OppTCOMS","PGP7","PGP"});
        put("A1E", new String[]{ "KRMRT", "LT27", "OppUHC", "CLB", "BIZ2", "PGP"});
        put("A2", new String[]{ "PGP", "PGPHse15", "TCOMS", "OppHSSML", "OppNUSS", "COM2", "Ventus", "IT", "OppYIH", "Museum", "UHC", "OppUHall", "S17", "OppKRMRT", "PGP"});
        put("A2E", new String[]{ "Ventus", "IT", "S17", "OppKRMRT"});
        put("B1", new String[]{ "KRBusTerminal", "IT", "OppYIH", "UTown", "YIH", "CLB", "LT13", "AS5", "BIZ2"});
        put("B2", new String[]{ "OppHSSML", "OppNUSS", "Ventus", "IT", "OppYIH", "UTown", "RafflesHall", "EA", "KRBusTerminal"});
        put("C", new String[]{ "KRBusTerminal", "JapaneseSch", "KV", "Museum", "UTown", "UHC", "OppUHall", "S17", "LT27", "UHall", "OppUHC", "UTown", "RafflesHall", "EA", "KRBusTerminal"});
        put("D1", new String[]{ "OppHSSML", "OppNUSS", "COM2", "Ventus", "IT", "OppYIH", "Museum", "UTown", "YIH", "CLB", "LT13", "AS5", "COM2", "BIZ2"});
        put("D2", new String[]{ "OppTCOMS", "PGP", "KRMRT", "LT27", "UHall", "OppUHC", "Museum", "UTown", "UHC", "OppUHall", "S17", "OppKRMRT", "PGPR", "TCOMS"});
        put("BTC1", new String[]{ "KRBusTerminal", "KV", "Museum", "YIH", "CLB", "LT13", "AS5", "BIZ2", "PGP", "CollegeGreen", "OTHBldg"});
        put("BTC2", new String[]{ "OTHBldg", "BGMRT", "Museum", "EA", "KRBusTerminal" } );
        }};
    	
    	String[] route = hm.get(bus);
    	String result = "";
    	String prev = "";
    	
    	if (route == null){
    		return "";
    	}
    	
    	for (int i = 0; i < route.length; i++){
    		if (i == route.length - 1){
    			return "";
    		} else if (prev.equals("")){
    			prev = route[i];
    		} else {
    			if (prev.equals(busStop)){
    				result = route[i];
    				break;
    			} else {
    				prev = route[i];
    			}
    		}
    	}
    	
    	return result;
	}
	
	public static double[] lessonLocationToCoordinates(String lessonLocation){
		Map<String, double[]> coordinates = new HashMap<String, double[]>() {{ 
		 put("OppKRMRT", new double[] { 1.2938035, 103.7849291});
		 put("KRMRT", new double[] { 1.2936616, 103.7845835});
		 put("AS1", new double[] { 1.2951454107251619, 103.77213443414018});
		 put("AS2", new double[] { 1.2952816454908467, 103.77100199113531});
		 put("AS3", new double[] { 1.2946548041759978, 103.77128735302539});
		 put("AS4", new double[] { 1.2944279381807529, 103.77151310836271});
		 put("AS5", new double[] { 1.2940219934452142, 103.77173425396464});
		 put("AS6", new double[] { 1.295558493014907, 103.77317523145778});
		 put("AS7", new double[] { 1.2945617708102077, 103.77115679974798});
		 put("AS8", new double[] { 1.2961353873044867, 103.77207885443464});
		 put("BIZ1", new double[] { 1.292623660669996, 103.77414714137413});
		 put("BIZ2", new double[] { 1.2933762295973443, 103.77501451728376});
		 put("CAPT", new double[] { 1.2933762295973443, 103.77501451728376});
		 put("CELS", new double[] { 1.294411011344144, 103.78076417172579});
		 put("COM1", new double[] { 1.2948764061055216, 103.77395649927423});
		 put("COM2", new double[] { 1.2935772164129489, 103.7741592837536});
		 put("E1", new double[] { 1.2985500698439354, 103.77119549169116});
		 put("E2", new double[] { 1.2993598687394592, 103.7711423635483});
		 put("E2A", new double[] { 1.2990182, 103.7714875});
		 put("E3", new double[] { 1.2993243027699033, 103.77168612825712});
		 put("E3A", new double[] { 1.3003768930179749, 103.77145604655468});
		 put("E4", new double[] { 1.298439954445622, 103.77222768235404});
		 put("E4A", new double[] { 1.2986179076481752, 103.77262273463798});
		 put("E5", new double[] { 1.2981082552454721, 103.7722243755894});
		 put("EA", new double[] { 1.2981082552454721, 103.7722243755894});
		 put("EH", new double[] { 1.2917351246659363, 103.77461339347067});
		 put("ENG", new double[] { 1.300612137950934, 103.7705817818642});
		 put("ERC", new double[] { 1.3062172, 103.7728749});
		 put("EW1", new double[] { 1.2988274380292781, 103.77059982927568});
		 put("EW2", new double[] { 1.2993791689773466, 103.77243682922185});
		 put("GBT", new double[] { 1.2968031, 103.7705455});
		 put("HSSMLCR", new double[] { 1.293218888755013, 103.77434492111207});
		 put("I3", new double[] { 1.2923067038862432, 103.77580382982545});
		 put("KEVII", new double[] { 1.2922060118957746, 103.78084659576416});
		 put("LT1", new double[] { 1.2995128919233356, 103.77129296022898});
		 put("LT2", new double[] { 1.2993124975071704, 103.77140470268863});
		 put("LT3", new double[] { 1.297782788396538, 103.77340105516473});
		 put("LT4", new double[] { 1.2974781271276108, 103.7735183186846});
		 put("LT6", new double[] { 1.2974781271276108, 103.7735183186846});
		 put("LT7", new double[] { 1.3000819751503252, 103.77108408506066});
		 put("LT7A", new double[] { 1.3004814583946265, 103.77094760790798});
		 put("LT8", new double[] { 1.2941286739949707, 103.77199079513672});
		 put("LT9", new double[] { 1.294968895355766, 103.7722506424852});
		 put("LT10", new double[] { 1.2949157602130599, 103.7720594590288});
		 put("LT11", new double[] { 1.295456827029062, 103.77139878788282});
		 put("LT12", new double[] { 1.2949801946461976, 103.77114846994691});
		 put("LT13", new double[] { 1.29506943418948, 103.77090632915497});
		 put("LT14", new double[] { 1.2957109058743046, 103.7733578704978});
		 put("LT15", new double[] { 1.295522499959851, 103.77340877469021});
		 put("LT16", new double[] { 1.2939170885884703, 103.77386420264736});
		 put("LT17", new double[] { 1.2936062312700383, 103.77401107931558});
		 put("LT18", new double[] { 1.2933049908717555, 103.77460509538652});
		 put("LT19", new double[] { 1.2937303, 103.7743029});
		 put("LT20", new double[] { 1.2958439182978323, 103.77882045948085});
		 put("LT21", new double[] { 1.295356780941112, 103.77946703176282});
		 put("LT26", new double[] { 1.2964439980596048, 103.78110405867265});
		 put("LT28", new double[] { 1.297199706737715, 103.7811495867657});
		 put("LT29", new double[] { 1.2970306748465374, 103.78121942281726});
		 put("LT31", new double[] { 1.296863036752469, 103.78039359238537});
		 put("LT32", new double[] { 1.2961400836523527, 103.77830217071332});
		 put("LT33", new double[] { 1.2977441788622253, 103.78090879191791});
		 put("LT34", new double[] { 1.2977295044675978, 103.78083854913713});
		 put("MD1", new double[] { 1.29553673659013, 103.78043812746127});
		 put("MD5", new double[] { 1.29553673659013, 103.78043812746127});
		 put("MD4", new double[] { 1.2957451781135965, 103.78087073564531});
		 put("MD7", new double[] { 1.296064279348453, 103.78117382526399});
		 put("MD9", new double[] { 1.2966962086013787, 103.78134551280169});
		 put("MD10", new double[] { 1.2964883988931324, 103.78168113019073});
		 put("NAK-AUD", new double[] { 1.305495177478812, 103.77310842275621});
		 put("PGPH-FR4", new double[] { 1.290896141645534, 103.78055155277254});
		 put("RC4", new double[] { 1.3082432342773747, 103.7728826457169});
		 put("RH", new double[] { 1.2997500633015104, 103.77391813424904});
		 put("RMI", new double[] { 1.2926128638467618, 103.77548217773439});
		 put("RVR", new double[] { 1.297287053455881, 103.77694934606554});
		 put("S1A", new double[] { 1.2959638, 103.7782827});
		 put("S2", new double[] { 1.2956254, 103.7781376});
		 put("S4", new double[] { 1.2952425, 103.7787845});
		 put("S5", new double[] { 1.29553333777584, 103.77986222505571});
		 put("S6", new double[] { 1.2952425, 103.7787845});
		 put("S7", new double[] { 1.2966426, 103.7742052});
		 put("S8", new double[] { 1.2961066770026624, 103.7792463148344});
		 put("S11", new double[] { 1.2967402501607153, 103.77886266466652});
		 put("S12", new double[] { 1.2969946927186957, 103.77863726856482});
		 put("S13", new double[] { 1.2967082923732496, 103.7792697342841});
		 put("S14", new double[] { 1.2968413874560345, 103.77972381491037});
		 put("S16", new double[] { 1.2967088, 103.7803574});
		 put("S17", new double[] { 1.2976204877546946, 103.78046365946426});
		 put("SDE", new double[] { 1.2973720912301383, 103.77112029684575});
		 put("SDE2", new double[] { 1.297217272355957, 103.77113030709059});
		 put("SDE4", new double[] { 1.2975205, 103.7702934});
		 put("SR_LT19", new double[] { 1.2937125827502152, 103.77432882785799});
		 put("TC", new double[] { 1.3058646900451434, 103.7735061935529});
		 put("TH", new double[] { 1.2927169615398948, 103.77129374071957});
		 put("TP", new double[] { 1.3039978035313131, 103.77340883016588});
		 put("USP", new double[] { 1.3064958843341745, 103.77313256263734});
		 put("UT", new double[] { 1.304382852208324, 103.7727275490761});
		 put("UTSRC", new double[] { 1.3041793140944875, 103.77278119325639});
		 put("WT", new double[] { 1.297212239020798, 103.77111796176165});
		 put("Y", new double[] { 1.306441772265005, 103.77229837467895 });
		 }};
		return coordinates.get(lessonLocation);
	}
	
	public static double[] busStopToCoordinates(String busStop){
		Map<String, double[]> coordinates = new HashMap<String, double[]>() {{ 
		 put("AS5",new double[] {1.2935051, 103.7721019});
		 put("BIZ2",new double[] {1.2936144, 103.7752274});
		 put("BGMRT",new double[] {1.3227282, 103.8150981});
		 put("OTHBldg",new double[] {1.3197524, 103.8179355});
		 put("CLB",new double[] {1.2965560, 103.7725341});
		 put("CollegeGreen",new double[] {1.3233426, 103.8163148});
		 put("COM2",new double[] {1.2943179, 103.7737746});
		 put("EA",new double[] {1.3005759, 103.7701154});
		 put("IT",new double[] {1.2975026, 103.7729143});
		 put("KRBusTerminal",new double[] {1.2941805, 103.7697687});
		 put("KRMRT",new double[] {1.2948452, 103.7843891});
		 put("KV",new double[] {1.3021181, 103.7690797});
		 put("LT13",new double[] {1.2943079, 103.7707974});
		 put("LT27",new double[] {1.2974416, 103.7809810});
		 put("Museum",new double[] {1.3010831, 103.7737210});
		 put("OppHSSML",new double[] {1.2927978, 103.7749974});
		 put("OppKRMRT",new double[] {1.2948703, 103.7845940});
		 put("OppNUSS",new double[] {1.2933308, 103.7723460});
		 put("OppTCOMS",new double[] {1.2938430, 103.7770137});
		 put("OppUHall",new double[] {1.2975153, 103.7781976});
		 put("OppUHC",new double[] {1.2988242, 103.7756263});
		 put("OppYIH",new double[] {1.2989717, 103.7741826});
		 put("PGPHse15",new double[] {1.2930506, 103.7777728});
		 put("PGP7",new double[] {1.2932500, 103.7777805});
		 put("PGP",new double[] {1.2917996, 103.7805096});
		 put("PGPR",new double[] {1.2909979, 103.7809599});
		 put("RafflesHall",new double[] {1.3009674, 103.7727048});
		 put("S17",new double[] {1.2975297, 103.7815259});
		 put("TCOMS",new double[] {1.2936509, 103.7769567});
		 put("JapaneseSch",new double[] {1.3007345, 103.7699712});
		 put("UHall",new double[] {1.2972281, 103.7786707});
		 put("UHC",new double[] {1.2989325, 103.7761967});
		 put("UTown",new double[] {1.3036077, 103.7745592});
		 put("Ventus",new double[] {1.2951861, 103.7705070});
		 put("YIH",new double[] {1.2988997, 103.7743724});
		 }};
		 return coordinates.get(busStop);
		 
	}
	
	public static Inventory lessonLocationToTop3BusStops(String lessonLocation){
		Map<String, Map<String, Double>> coordinates = new HashMap<String, Map<String, Double>>() {{
			put("Home", new HashMap<String, Double>() {{put("OppKRMRT", 0.0); put("KRMRT", 0.0);}});
			put("OppKRMRT", new HashMap<String, Double>() {{put("OppKRMRT", 0.0); put("KRMRT", 0.0);}});
			put("KRMRT", new HashMap<String, Double>() {{put("OppKRMRT", 0.0); put("KRMRT", 0.0);}});
			put("AS1", new HashMap<String, Double>() {{put("LT13", 1.46047); put("Ventus", 1.47472); put("CLB", 1.5204); put("AS5", 1.69695); put("COM2", 1.73752);}});
			put("AS2", new HashMap<String, Double>() {{put("Ventus", 0.33503); put("LT13", 0.44107); put("KRBusTerminal", 1.86932); put("CLB", 1.94632); put("AS5", 2.02644);}});
			put("AS3", new HashMap<String, Double>() {{put("LT13", 0.68379); put("Ventus", 0.92678); put("AS5", 1.33822); put("KRBusTerminal", 1.91614); put("OppNUSS", 2.2466);}});
			put("AS4", new HashMap<String, Double>() {{put("LT13", 0.99415); put("AS5", 1.03775); put("Ventus", 1.24641); put("OppNUSS", 1.92828); put("KRBusTerminal", 2.11467);}});
			put("AS5", new HashMap<String, Double>() {{put("AS5", 0.58118); put("LT13", 1.41914); put("OppNUSS", 1.51245); put("Ventus", 1.69901); put("COM2", 1.9252);}});
			put("AS6", new HashMap<String, Double>() {{put("CLB", 1.33829); put("COM2", 1.35969); put("BIZ2", 2.29822); put("OppNUSS", 2.34148); put("AS5", 2.45174);}});
			put("AS7", new HashMap<String, Double>() {{put("LT13", 0.62887); put("Ventus", 0.92396); put("AS5", 1.32474); put("KRBusTerminal", 1.77252); put("OppNUSS", 2.29309);}});
			put("AS8", new HashMap<String, Double>() {{put("CLB", 0.59722); put("Ventus", 1.60982); put("LT13", 1.81381); put("IT", 1.90794); put("COM2", 2.42495);}});
			put("BIZ1", new HashMap<String, Double>() {{put("OppHSSML", 0.92698); put("TCOMS", 1.2542); put("OppTCOMS", 1.2542); put("OppNUSS", 1.27802); put("BIZ2", 1.28098);}});
			put("BIZ2", new HashMap<String, Double>() {{put("TCOMS", 0.35161); put("OppTCOMS", 0.35161); put("OppHSSML", 0.41894); put("BIZ2", 0.55577); put("COM2", 1.64421);}});
			put("CAPT", new HashMap<String, Double>() {{put("TCOMS", 0.35161); put("OppTCOMS", 0.35161); put("OppHSSML", 0.41894); put("BIZ2", 0.55577); put("COM2", 1.64421);}});
			put("CELS", new HashMap<String, Double>() {{put("PGP", 2.56213); put("S17", 3.00889); put("LT27", 3.02335); put("PGP HSE 15", 3.23459); put("UHall", 3.42918);}});
			put("COM1", new HashMap<String, Double>() {{put("COM2", 0.67306); put("BIZ2", 1.28319); put("TCOMS", 1.48496); put("OppTCOMS", 1.48496); put("OppNUSS", 1.9018);}});
			put("COM2", new HashMap<String, Double>() {{put("BIZ2", 0.54312); put("TCOMS", 0.67799); put("OppTCOMS", 0.67799); put("COM2", 0.87382); put("OppHSSML", 1.05424);}});
			put("E1", new HashMap<String, Double>() {{put("IT", 0.66349); put("EA", 2.11886); put("CLB", 2.25077); put("RafflesHall", 2.52596); put("YIH", 2.68746);}});
			put("E2", new HashMap<String, Double>() {{put("EA", 1.37778); put("IT", 1.46254); put("RafflesHall", 1.73969); put("Museum", 2.01693); put("YIH", 2.77634);}});
			put("E2A", new HashMap<String, Double>() {{put("IT", 1.09922); put("EA", 1.85642); put("Museum", 2.15686); put("RafflesHall", 2.19173); put("YIH", 2.38786);}});
			put("E3", new HashMap<String, Double>() {{put("IT", 1.42966); put("EA", 1.7645); put("Museum", 1.80046); put("RafflesHall", 2.02972); put("YIH", 2.23678);}});
			put("E3A", new HashMap<String, Double>() {{put("Museum", 1.04997); put("EA", 1.09053); put("RafflesHall", 1.11825); put("IT", 2.45555); put("YIH", 2.86428);}});
			put("E4", new HashMap<String, Double>() {{put("IT", 0.96905); put("YIH", 1.68666); put("OppYIH", 1.68666); put("CLB", 1.80367); put("Museum", 2.58326);}});
			put("E4A", new HashMap<String, Double>() {{put("YIH", 1.26367); put("OppYIH", 1.26367); put("IT", 1.39936); put("CLB", 1.98752); put("Museum", 2.42843);}});
			put("E5", new HashMap<String, Double>() {{put("IT", 0.83662); put("CLB", 1.47404); put("YIH", 1.79609); put("OppYIH", 1.79609); put("Museum", 2.91495);}});
			put("EA", new HashMap<String, Double>() {{put("IT", 0.83662); put("CLB", 1.47404); put("YIH", 1.79609); put("OppYIH", 1.79609); put("Museum", 2.91495);}});
			put("EH", new HashMap<String, Double>() {{put("OppHSSML", 1.28553); put("TCOMS", 1.95254); put("OppTCOMS", 1.95254); put("BIZ2", 2.06509); put("OppNUSS", 2.18105);}});
			put("ENG", new HashMap<String, Double>() {{put("EA", 0.2359); put("RafflesHall", 0.3766); put("Museum", 1.75101); put("KV", 2.34965); put("IT", 2.81458);}});
			put("ERC", new HashMap<String, Double>() {{put("UTown", 3.16524); put("KV", 4.8614); put("Museum", 5.2281); put("RafflesHall", 5.74107); put("EA", 6.23827);}});
			put("EW1", new HashMap<String, Double>() {{put("IT", 1.21434); put("EA", 1.69058); put("RafflesHall", 2.15718); put("Museum", 2.7668); put("CLB", 2.82504);}});
			put("EW2", new HashMap<String, Double>() {{put("YIH", 1.53222); put("OppYIH", 1.53222); put("Museum", 1.65052); put("IT", 1.78347); put("EA", 2.35001);}});
			put("GBT", new HashMap<String, Double>() {{put("IT", 1.41307); put("Ventus", 1.45926); put("LT13", 1.83213); put("CLB", 1.85356); put("KRBusTerminal", 2.73763);}});
			put("HSSMLCR", new HashMap<String, Double>() {{put("BIZ2", 0.65835); put("TCOMS", 0.66632); put("OppTCOMS", 0.66632); put("OppHSSML", 0.71654); put("COM2", 1.27404);}});
			put("I3", new HashMap<String, Double>() {{put("OppHSSML", 1.02483); put("TCOMS", 1.67989); put("OppTCOMS", 1.67989); put("BIZ2", 1.8841); put("COM2", 2.92803);}});
			put("KEVII", new HashMap<String, Double>() {{put("PGP", 0.59092); put("PGPR", 1.24947); put("PGP HSE 15", 1.53225); put("PGP7", 1.95793); put("KRMRT", 4.01039);}});
			put("LT1", new HashMap<String, Double>() {{put("EA", 1.35145); put("IT", 1.5953); put("RafflesHall", 1.66265); put("Museum", 1.80593); put("YIH", 2.66359);}});
			put("LT2", new HashMap<String, Double>() {{put("IT", 1.3907); put("EA", 1.57525); put("RafflesHall", 1.89205); put("Museum", 1.92292); put("YIH", 2.50978);}});
			put("LT3", new HashMap<String, Double>() {{put("YIH", 1.14865); put("OppYIH", 1.14865); put("CLB", 1.52154); put("IT", 1.9971); put("OppUHC", 2.43057);}});
			put("LT4", new HashMap<String, Double>() {{put("YIH", 1.39852); put("OppYIH", 1.39852); put("CLB", 1.40152); put("IT", 2.15567); put("OppUHC", 2.48381);}});
			put("LT6", new HashMap<String, Double>() {{put("YIH", 1.39852); put("OppYIH", 1.39852); put("CLB", 1.40152); put("IT", 2.15567); put("OppUHC", 2.48381);}});
			put("LT7", new HashMap<String, Double>() {{put("EA", 0.8264); put("RafflesHall", 1.065); put("Museum", 1.52465); put("IT", 2.18444); put("YIH", 3.05167);}});
			put("LT7A", new HashMap<String, Double>() {{put("EA", 0.5752); put("RafflesHall", 0.66149); put("Museum", 1.4418); put("IT", 2.60087); put("KV", 2.64579);}});
			put("LT8", new HashMap<String, Double>() {{put("AS5", 0.67012); put("OppNUSS", 1.36991); put("LT13", 1.55773); put("COM2", 1.65815); put("Ventus", 1.79573);}});
			put("LT9", new HashMap<String, Double>() {{put("AS5", 1.54454); put("COM2", 1.55185); put("LT13", 1.56686); put("Ventus", 1.62203); put("CLB", 1.68088);}});
			put("LT10", new HashMap<String, Double>() {{put("LT13", 1.37699); put("Ventus", 1.45186); put("AS5", 1.45975); put("COM2", 1.70486); put("CLB", 1.75978);}});
			put("LT11", new HashMap<String, Double>() {{put("Ventus", 0.73279); put("LT13", 0.86152); put("CLB", 1.54783); put("AS5", 2.05399); put("KRBusTerminal", 2.30023);}});
			put("LT12", new HashMap<String, Double>() {{put("LT13", 0.46469); put("Ventus", 0.60133); put("AS5", 1.69129); put("KRBusTerminal", 1.86907); put("CLB", 2.07712);}});
			put("LT13", new HashMap<String, Double>() {{put("LT13", 0.24127); put("Ventus", 0.36395); put("KRBusTerminal", 1.683); put("AS5", 1.88712); put("CLB", 2.16482);}});
			put("LT14", new HashMap<String, Double>() {{put("CLB", 1.34269); put("COM2", 1.45745); put("BIZ2", 2.30957); put("OppNUSS", 2.51171); put("TCOMS", 2.51196);}});
			put("LT15", new HashMap<String, Double>() {{put("COM2", 1.26281); put("CLB", 1.51352); put("BIZ2", 2.12604); put("TCOMS", 2.33049); put("OppTCOMS", 2.33049);}});
			put("LT16", new HashMap<String, Double>() {{put("COM2", 0.42678); put("BIZ2", 0.79915); put("TCOMS", 0.99563); put("OppTCOMS", 0.99563); put("OppNUSS", 1.09489);}});
			put("LT17", new HashMap<String, Double>() {{put("BIZ2", 0.6721); put("COM2", 0.76951); put("TCOMS", 0.82195); put("OppTCOMS", 0.82195); put("OppNUSS", 1.06471);}});
			put("LT18", new HashMap<String, Double>() {{put("TCOMS", 0.43356); put("OppTCOMS", 0.43356); put("BIZ2", 0.49729); put("OppHSSML", 0.53522); put("COM2", 1.37154);}});
			put("LT19", new HashMap<String, Double>() {{put("BIZ2", 0.3586); put("TCOMS", 0.53003); put("OppTCOMS", 0.53003); put("COM2", 0.8606); put("OppHSSML", 1.04898);}});
			put("LT20", new HashMap<String, Double>() {{put("UHall", 1.36516); put("OppUHall", 1.79741); put("S17", 2.50221); put("LT27", 2.61792); put("PGP", 4.24756);}});
			put("LT21", new HashMap<String, Double>() {{put("UHall", 1.97475); put("S17", 2.43692); put("LT27", 2.52254); put("OppUHall", 2.5438); put("PGP", 3.58558);}});
			put("LT26", new HashMap<String, Double>() {{put("LT27", 1.00761); put("S17", 1.03345); put("UHall", 2.44572); put("OppUHall", 3.22732); put("KRMRT", 4.45514);}});
			put("LT28", new HashMap<String, Double>() {{put("LT27", 0.33873); put("S17", 0.44403); put("UHall", 2.3687); put("OppUHall", 3.11861); put("KRMRT", 4.93051);}});
			put("LT29", new HashMap<String, Double>() {{put("LT27", 0.51087); put("S17", 0.59909); put("UHall", 2.445); put("OppUHall", 3.20665); put("KRMRT", 4.76106);}});
			put("LT31", new HashMap<String, Double>() {{put("S17", 0.6688); put("LT27", 0.76262); put("UHall", 1.64928); put("OppUHall", 2.427); put("PGP", 4.98101);}});
			put("LT32", new HashMap<String, Double>() {{put("UHall", 1.17077); put("OppUHall", 1.3493); put("S17", 2.77462); put("LT27", 2.90304); put("OppUHC", 3.86242);}});
			put("LT33", new HashMap<String, Double>() {{put("LT27", 0.31305); put("S17", 0.35514); put("UHall", 2.19428); put("OppUHall", 2.88024); put("OppUHC", 5.45378);}});
			put("LT34", new HashMap<String, Double>() {{put("LT27", 0.30504); put("S17", 0.31845); put("UHall", 2.12258); put("OppUHall", 2.80892); put("OppUHC", 5.38817);}});
			put("MD1", new HashMap<String, Double>() {{put("S17", 1.91115); put("LT27", 1.9505); put("UHall", 2.35397); put("OppUHall", 3.07493); put("PGP", 3.65554);}});
			put("MD5", new HashMap<String, Double>() {{put("S17", 1.91115); put("LT27", 1.9505); put("UHall", 2.35397); put("OppUHall", 3.07493); put("PGP", 3.65554);}});
			put("MD4", new HashMap<String, Double>() {{put("S17", 1.67812); put("LT27", 1.68632); put("UHall", 2.55122); put("OppUHall", 3.30988); put("PGP", 3.89761);}});
			put("MD7", new HashMap<String, Double>() {{put("LT27", 1.39363); put("S17", 1.41621); put("UHall", 2.65242); put("OppUHall", 3.43024); put("KRMRT", 4.17118);}});
			put("MD9", new HashMap<String, Double>() {{put("LT27", 0.85828); put("S17", 0.92838); put("UHall", 2.61528); put("OppUHall", 3.39139); put("KRMRT", 4.43773);}});
			put("MD10", new HashMap<String, Double>() {{put("LT27", 1.22289); put("S17", 1.30722); put("UHall", 2.98829); put("OppUHall", 3.76747); put("KRMRT", 4.05149);}});
			put("NAK-AUD", new HashMap<String, Double>() {{put("UTown", 2.43867); put("Museum", 4.54793); put("KV", 4.55051); put("RafflesHall", 5.20373); put("EA", 5.69284);}});
			put("PGPH-FR4", new HashMap<String, Double>() {{put("PGPR", 0.6382); put("PGP7", 0.77394); put("PGP", 1.00599); put("PGP HSE 15", 1.77916); put("KRMRT", 4.88921);}});
			put("RC4", new HashMap<String, Double>() {{put("UTown", 4.99044); put("KV", 6.48243); put("Museum", 7.24541); put("RafflesHall", 7.63614); put("EA", 8.13727);}});
			put("RH", new HashMap<String, Double>() {{put("YIH", 0.91923); put("OppYIH", 0.91923); put("OppUHC", 1.87291); put("UHC", 1.87291); put("Museum", 2.07117);}});
			put("RMI", new HashMap<String, Double>() {{put("OppHSSML", 0.58284); put("TCOMS", 1.24684); put("OppTCOMS", 1.24684); put("BIZ2", 1.44691); put("COM2", 2.48408);}});
			put("RVR", new HashMap<String, Double>() {{put("OppUHall", 1.1071); put("UHall", 1.83324); put("OppUHC", 2.10007); put("UHC", 2.10007); put("YIH", 3.44696);}});
			put("S1A", new HashMap<String, Double>() {{put("UHall", 1.3407); put("OppUHall", 1.51945); put("S17", 2.87699); put("LT27", 3.00259); put("OppUHC", 3.97582);}});
			put("S2", new HashMap<String, Double>() {{put("UHall", 1.70881); put("OppUHall", 1.84117); put("S17", 3.18091); put("LT27", 3.30219); put("TCOMS", 3.83944);}});
			put("S4", new HashMap<String, Double>() {{put("UHall", 1.966); put("OppUHall", 2.34233); put("S17", 2.9427); put("LT27", 3.04557); put("PGP", 3.70805);}});
			put("S5", new HashMap<String, Double>() {{put("UHall", 1.99385); put("S17", 2.09101); put("LT27", 2.16417); put("OppUHall", 2.65336); put("PGP", 3.68388);}});
			put("S6", new HashMap<String, Double>() {{put("UHall", 1.966); put("OppUHall", 2.34233); put("S17", 2.9427); put("LT27", 3.04557); put("PGP", 3.70805);}});
			put("S7", new HashMap<String, Double>() {{put("CLB", 1.813); put("YIH", 2.2154); put("OppYIH", 2.2154); put("COM2", 2.42746); put("OppUHC", 2.61685);}});
			put("S8", new HashMap<String, Double>() {{put("UHall", 1.19609); put("OppUHall", 1.81452); put("S17", 2.00697); put("LT27", 2.12053); put("PGP", 4.36685);}});
			put("S11", new HashMap<String, Double>() {{put("UHall", 0.47534); put("OppUHall", 1.09413); put("S17", 2.01916); put("LT27", 2.15349); put("OppUHC", 3.92057);}});
			put("S12", new HashMap<String, Double>() {{put("UHall", 0.25757); put("OppUHall", 0.75792); put("S17", 2.16882); put("LT27", 2.30671); put("OppUHC", 3.59417);}});
			put("S13", new HashMap<String, Double>() {{put("UHall", 0.6994); put("OppUHall", 1.44156); put("S17", 1.65506); put("LT27", 1.78546); put("OppUHC", 4.28393);}});
			put("S14", new HashMap<String, Double>() {{put("UHall", 1.01186); put("S17", 1.19024); put("LT27", 1.31784); put("OppUHall", 1.79321); put("OppUHC", 4.62133);}});
			put("S16", new HashMap<String, Double>() {{put("S17", 0.81914); put("LT27", 0.90486); put("UHall", 1.6538); put("OppUHall", 2.43529); put("PGP", 4.8266);}});
			put("S17", new HashMap<String, Double>() {{put("S17", 0.36116); put("LT27", 0.47774); put("UHall", 1.73246); put("OppUHall", 2.4265); put("OppUHC", 5.0484);}});
			put("SDE", new HashMap<String, Double>() {{put("IT", 0.62082); put("CLB", 1.46566); put("Ventus", 2.07127); put("LT13", 2.43533); put("YIH", 3.11165);}});
			put("SDE2", new HashMap<String, Double>() {{put("IT", 0.75757); put("CLB", 1.38609); put("Ventus", 1.92273); put("LT13", 2.28512); put("YIH", 3.1786);}});
			put("SDE4", new HashMap<String, Double>() {{put("IT", 1.18539); put("Ventus", 2.20409); put("CLB", 2.27455); put("LT13", 2.57408); put("EA", 2.98326);}});
			put("SR_LT19", new HashMap<String, Double>() {{put("BIZ2", 0.33734); put("TCOMS", 0.50263); put("OppTCOMS", 0.50263); put("COM2", 0.89186); put("OppHSSML", 1.01842);}});
			put("TC", new HashMap<String, Double>() {{put("UTown", 2.55129); put("Museum", 4.99396); put("KV", 5.09153); put("RafflesHall", 5.72454); put("EA", 6.2104);}});
			put("TH", new HashMap<String, Double>() {{put("AS5", 0.9624); put("OppNUSS", 1.79679); put("LT13", 2.34013); put("KRBusTerminal", 2.47747); put("Ventus", 2.70453);}});
			put("TP", new HashMap<String, Double>() {{put("UTown", 1.25326); put("Museum", 3.18074); put("KV", 4.10407); put("RafflesHall", 4.17801); put("EA", 4.6296);}});
			put("USP", new HashMap<String, Double>() {{put("UTown", 3.28192); put("KV", 5.24089); put("Museum", 5.53867); put("RafflesHall", 6.10219); put("EA", 6.59807);}});
			put("UT", new HashMap<String, Double>() {{put("UTown", 2.03047); put("Museum", 3.3894); put("KV", 3.62547); put("RafflesHall", 4.05569); put("EA", 4.53877);}});
			put("UTSRC", new HashMap<String, Double>() {{put("UTown", 1.90511); put("Museum", 3.19563); put("KV", 3.58471); put("RafflesHall", 3.91742); put("EA", 4.39521);}});
			put("WT", new HashMap<String, Double>() {{put("IT", 0.76685); put("CLB", 1.39528); put("Ventus", 1.91494); put("LT13", 2.2778); put("YIH", 3.19179);}});
			put("Y", new HashMap<String, Double>() {{put("UTown", 3.68305); put("KV", 4.66024); put("Museum", 5.41919); put("RafflesHall", 5.7423); put("EA", 6.24343);}});
		}};
    	Map<String, Double> hm = coordinates.get(lessonLocation);
    	
    	String[] busStopsNames = new String[hm.size()];
    	double[] busStopsCoordinates = new double[hm.size()];
    	
    	int i = 0;
    	for (Map.Entry mapElement : hm.entrySet()) { 
            String key = (String)mapElement.getKey();
            double value = ((double)mapElement.getValue());
            busStopsNames[i] = key;
            busStopsCoordinates[i] = value;
            i++;
    	}
    	
    	return new Inventory(busStopsNames, busStopsCoordinates);
	}
} 

class Inventory {     
	private String[] busStopsNames; //array2
	private double[] busStopsCoordinates; //array1

	public Inventory(String[] busStopsNames, double[] busStopsCoordinates) {
		this.busStopsNames = busStopsNames;
		this.busStopsCoordinates = busStopsCoordinates;
		
	}

	public String[] getBusStopsNames(){
		return this.busStopsNames;
	}
	
	public double[] getBusStopsCoordinates(){
		return this.busStopsCoordinates;
	}
}

// Class to represent a node in the graph 
class Node implements Comparator<Node> { 
	public String node; 
	public double weight;
	
	public Node() 
	{ 
	} 

	public Node(String node, double weight) 
	{ 
		this.node = node; 
		this.weight = weight;
	} 

	@Override
	public int compare(Node node1, Node node2) 
	{ 
		if (node1.weight < node2.weight) {
			return -1; 
		}
		if (node1.weight > node2.weight) {
			return 1; 
		}
		else {
			return 0;
		}
	} 
} 


