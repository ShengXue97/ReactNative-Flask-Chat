# Python program for Dijkstra's single
# source shortest path algorithm. The program is
# for adjacency matrix representation of the graph

# Library for INT_MAX
import sys
import math
import time

try:
    import Queue as Q  # ver. < 3.0
except ImportError:
    import queue as Q


# A node is an object to be inserted to the Dijkstra's PriorityQueue, with lesser weight as higher priority
class Node(object):
    def __init__(self, node, weight):
        # node refers to the name of the node in string, while weight refers to the current shortest distance from the source
        # to the node
        self.node = node
        self.weight = weight

    def __str__(self):
        return str(self.node) + ";" + str(self.weight)

    def __lt__(self, other):
        selfPriority = (self.weight)
        otherPriority = (other.weight)
        return selfPriority < otherPriority


# A Distance is an object to be inserted to a PriorityQueue, which ranks all the bus stops according to
# the distance from the given location
class Distance(object):
    def __init__(self, busStop, mydistance):
        self.busStop = busStop
        self.mydistance = mydistance

    def __str__(self):
        return str(self.busStop) + ";" + str(self.mydistance)

    def __lt__(self, other):
        selfPriority = (self.mydistance)
        otherPriority = (other.mydistance)
        return selfPriority < otherPriority


class Graph():

    def __init__(self):
        self.out = []
        # sourceLocation is the source which the student intends to travel from
        self.sourceLocation = ""
        # destLocation is the destination which the student intends to go to
        self.destLocation = ""
        # Dist stores the shortest distance from the source to each vetex
        self.dist = {}
        # Stops stores the minimum number of bus stops from the source to each vertex
        self.stops = {}
        # p stores the predecessor array of each vertex
        self.p = {}
        # settled is a set which stores the vertices which shortest distance from source has been finalised
        self.settled = set()
        # pq is a PriorityQueue which allows the vertex with the current smallest distance from source
        # to be extracted
        self.pq = Q.PriorityQueue()
        # busTaken is the bus taken by the student
        self.busTaken = ""

    # backtrack traces the predecessor array p to return the route taken in order
    def backtrack(self, u):
        if u == "-1":
            return
        elif self.p[u] != "-1":
            self.backtrack(self.p[u])
            if (self.p[u] != "Source" and self.p[u] != "Destination"):
                self.busTaken = self.p[u].split(";")[1]

            if self.p[u] == "Source":
                pass
                #self.out.append(self.sourceLocation + "(Source)")
            else:
                self.out.append(self.p[u].split(";")[0])

    # Funtion that implements Dijkstra's single source
    # shortest path algorithm for a graph represented
    # using adjacency matrix representation
    def dijkstra(self, src, dest):
        # snow
        self.sourceLocation = src
        self.destLocation = dest

        self.pq.put(Node("Source", 0.0))

        # Minimum distance from source to source is 0
        self.dist["Source"] = 0.0
        # Minimum number of bus stops from source to soruce is 0
        self.stops["Source"] = 0
        while not self.pq.empty():
            # Pick the minimum distance vertex from
            # the set of vertices not yet processed.
            # u is always equal to src in first iteration=
            u = self.pq.get()
            # Put the minimum distance vertex in the
            # shotest path tree
            self.settled.add(u.node)

            # Try to relax each of the neighbours of the vertex(The neighbours or edges are implicitly generated)
            self.e_Neighbours(u)

        print("Total time taken: " + str(self.dist["Destination"] / 60) + " minutes")
        self.backtrack("Destination")
        print("Bus taken: " + self.busTaken)

        #self.out.append(self.destLocation + "(Destination)")
        if len(self.out) == 1 or len(self.out) == 0:
            mockList = ""
            results = ("None", "None", "Walk", round(self.dist["Destination"],3) * 3, mockList)
            return results
        else:
            results = (self.out[0], self.out[-1], self.busTaken, round(self.dist["Destination"],3) * 3, self.out)
            return results

    def e_Neighbours(self, u):
        # Update dist value of the adjacent vertices
        # of the picked vertex only if the current
        # distance is greater than new distance and
        # the vertex in not in the shotest path tree
        edgeDistance = -1.0
        newDistance = -1.0

        # Since the vertices and edges are all implicitly generated, the hashmaps
        # dist, p and stops have all to be initialised during this generation
        if u.node not in self.dist:
            # The distance from source to this vertex is now infinity
            self.dist[u.node] = sys.maxsize
        if u.node not in self.p:
            # The vertex now has no predecessor vertex, indicated by "-1"
            self.p[u.node] = "-1"
        if u.node not in self.stops:
            # The vertex now has no minimum number of bus stops from source, indicated by -1
            self.stops[u.node] = -1

        # Implicitly generate the neighbours of this vertex u, and store in neighbourList
        neighbourList = []

        # FIRST CASE: Generate walking edges from source to each of the nearest bus stops
        if (u.node == "Source"):
            # Estimated walking speed of a person
            walkingSpeedKMPerSecond = 0.0014

            busStopsNames = []
            busStopToCoordinates = []
            # Check if the source given is a bus stop
            if (self.busStopToCoordinates(self.sourceLocation)):
                # If bus stop is given as the source, simply use the bus stop
                inv = self.getClosestBusStops(self.sourceLocation)
                busStopsNames = inv[0]
                busStopToCoordinates = inv[1]
            else:
                # Else if bus stop is not given, lessonLocationToTop3BusStops returns
                # the bus stops nearest to the source lesson location
                # stored in a tuple. The first element is a list of bus stop names, the second element
                # is a list of the bus stop coordinates

                # inv = self.lessonLocationToTop3BusStops(self.sourceLocation)
                inv = self.getClosestBusStops(self.sourceLocation)
                busStopsNames = inv[0]
                busStopToCoordinates = inv[1]

            # For each of the bus stops closest to source, generate a walking edge from source to the bus stop.
            # Do this for every possible bus services available at the bus stop
            for i in range(len(busStopsNames)):
                busesList = self.getBusesAtBusStop(busStopsNames[i])
                for j in range(len(busesList)):
                    neighbourList.append(Node(str(busStopsNames[i]) + ";" + str(busesList[j]),
                                              busStopToCoordinates[i] / walkingSpeedKMPerSecond))

            # Special scenario: If the source is within an estimated time of 0.2s, the student
            # should walk instead of taking a bus to reach the destination faster
            # uC = self.mapToCoordinates(self.sourceLocation)
            # vC = self.mapToCoordinates(self.destLocation)
            # distanceT = self.distance(uC[0], vC[1], vC[0], vC[1], "K")
            # timeTaken = distanceT / walkingSpeedKMPerSecond

            # if distanceT < 0.2:
            #     neighbourList.append(Node("Destination", timeTaken))

        # SECOND CASE: Do not generate any outgoing edges from the destination vertex
        elif u.node == "Destination":
            return
        # THIRD CASE: Generate an outgoing edge for each of the (bus stop, bus) vertex
        else:
            busStop = u.node.split(";")[0]
            bus = u.node.split(";")[1]

            # Generates a bus edge from the bus stop to the next bus stop in the bus route
            nextBusStop = self.getNextBusStop(busStop, bus)
            if nextBusStop == "":
                return
            else:
                busSpeedKMPerSecond = 0.00833333
                walkingSpeedKMPerSecond = 0.0014
                uC = self.busStopToCoordinates(busStop)
                vC = self.busStopToCoordinates(nextBusStop)
                distanceT = self.distance(uC[0], uC[1], vC[0], vC[1], "K")
                timeTaken = distanceT / busSpeedKMPerSecond

                neighbourList.append(Node(nextBusStop + ";" + bus, timeTaken))

            # Generates a walking edge from the bus stop to the destination vertex
            vC2 = self.mapToCoordinates(self.destLocation)
            distanceT2 = self.distance(uC[0], uC[1], vC2[0], vC2[1], "K")
            timeTaken2 = distanceT2 / walkingSpeedKMPerSecond

            neighbourList.append(Node("Destination", timeTaken2))

        # Now, loop through this neighbour list of the vertex u and try to relax the edges
        for i in range(len(neighbourList)):
            # Initialise the arrays for this neighbouring vertex v if it has not been initialised before
            v = neighbourList[i]
            if v.node not in self.dist:
                self.dist[v.node] = sys.maxsize
            if v.node not in self.p:
                self.p[v.node] = "-1"
            if v.node not in self.stops:
                self.stops[v.node] = -1

            # If the shortest distance from source to this vertex v has not already been finalised
            if v.node not in self.settled:
                edgeDistance = v.weight
                newDistance = self.dist[u.node] + edgeDistance

                # Relax this edge if the distance from source to this vertex v is smaller
                # if this edge is taken
                if newDistance < self.dist[v.node]:
                    # Update the new shortest disance of v
                    self.dist[v.node] = newDistance
                    # Update the predecessor of v
                    self.p[v.node] = u.node
                    # Update the minimum number of bus stops to take to v
                    self.stops[v.node] = self.stops[u.node] + 1
                # Else if the distance taken is the same, consider relaxing this
                # edge if the number of bus stops taken from source to this vertex v
                # is reduced if this edge is taken
                elif newDistance == self.dist[v.node]:
                    if self.stops[u.node] + 1 < self.stops[v.node]:
                        # Update the new shortest disance of v
                        self.dist[v.node] = newDistance
                        # Update the predecessor of v
                        self.p[v.node] = u.node
                        # Update the minimum number of bus stops to take to v
                        self.stops[v.node] = self.stops[u.node] + 1

                # print(str(u.node) + ";" + str(v.node) + ";" + str(self.dist[u.node]) + ";" + str(self.dist[v.node]))
                self.pq.put(Node(v.node, self.dist[v.node]))

    # Returns the distance between two points on Earth, given the latitudes and longtitudes
    def distance(self, lat1, lon1, lat2, lon2, unit):
        """ generated source for method distance """
        if (lat1 == lat2) and (lon1 == lon2):
            return 0
        else:
            theta = lon1 - lon2
            dist = math.sin(math.radians(lat1)) * math.sin(math.radians(lat2)) + math.cos(
                math.radians(lat1)) * math.cos(math.radians(lat2)) * math.cos(math.radians(theta))
            dist = math.acos(dist)
            dist = math.degrees(dist)
            dist = dist * 60 * 1.1515
            if unit == "K":
                dist = dist * 1.609344
            elif unit == "N":
                dist = dist * 0.8684
            return (dist)

    # Returns the available bus services at a bus stop
    def getBusesAtBusStop(self, busStop):
        buses = ["AS5;A1", "AS5;D1", "AS5;B1", "AS5;BTC1", "BIZ2;A1", "BIZ2;D1", "BIZ2;B1", "BIZ2;BTC1", "BIZ2;A1E",
                 "BGMRT;BTC2", "OTHBldg;BTC2", "CLB;A1", "CLB;D1", "CLB;B1", "CLB;BTC1", "CLB;A1E", "CollegeGreen;BTC1",
                 "COM2;A1", "COM2;A2", "COM2;D1", "EA;B2", "EA;BTC2", "EA;C", "IT;A2", "IT;D1", "IT;B1", "IT;B2",
                 "IT;A2E", "KRBusTerminal;B1", "KRBusTerminal;BTC1", "KRBusTerminal;C", "KRMRT;A1", "KRMRT;D2",
                 "KRMRT;A1E", "KV;BTC1", "KV;C", "LT13;A1", "LT13;D1", "LT13;B1", "LT13;BTC1", "LT27;A1", "LT27;D2",
                 "LT27;A1E", "LT27;C", "Museum;A2", "Museum;D1", "Museum;D2", "Museum;BTC1", "Museum;BTC2", "Museum;C",
                 "OppHSSML;A2", "OppHSSML;D1", "OppHSSML;B2", "OppKRMRT;A2", "OppKRMRT;D2", "OppKRMRT;A2E",
                 "OppNUSS;A2", "OppNUSS;D1", "OppNUSS;B2", "OppTCOMS;A1", "OppTCOMS;D2", "OppUHALL;A2", "OppUHALL;D2",
                 "OppUHALL;C", "OppUHC;A1", "OppUHC;D2", "OppUHC;A1E", "OppUHC;C", "OppYIH;A2", "OppYIH;D1",
                 "OppYIH;B1", "OppYIH;B2", "PGPHse15;A2", "PGP7;A1", "PGP;A1", "PGP;A2", "PGP;D2", "PGP;BTC1",
                 "PGP;A1E", "PGPR;D2", "RafflesHall;B2", "RafflesHall;C", "S17;A2", "S17;D2", "S17;A2E", "S17;C",
                 "TCOMS;A2", "TCOMS;D2", "JapaneseSch;C", "UHall;A1", "UHall;D2", "UHall;C", "UHC;A2", "UHC;D2",
                 "UHC;C", "UTown;D1", "UTown;D2", "UTown;B1", "UTown;B2", "UTown;C", "Ventus;A2", "Ventus;D1",
                 "Ventus;B2", "Ventus;A2E", "YIH;A1", "YIH;D1", "YIH;B1"]
        outputBuses = []

        for i in range(len(buses)):
            tbusStop = buses[i].split(";")[0]
            tbus = buses[i].split(";")[1]
            if tbusStop == busStop:
                outputBuses.append((tbus))

        return outputBuses

    # Converts lesson location to a tuple of (latitude, longtitude)
    def lessonLocationToCoordinates(self, lessonLocation):
        coordinates = {}
        coordinates["OppKRMRT"] = [1.2938035, 103.7849291]
        coordinates["KRMRT"] = [1.2936616, 103.7845835]
        coordinates["AS1"] = [1.2951454107251619, 103.77213443414018]
        coordinates["AS2"] = [1.2952816454908467, 103.77100199113531]
        coordinates["AS3"] = [1.2946548041759978, 103.77128735302539]
        coordinates["AS4"] = [1.2944279381807529, 103.77151310836271]
        coordinates["AS5"] = [1.2940219934452142, 103.77173425396464]
        coordinates["AS6"] = [1.295558493014907, 103.77317523145778]
        coordinates["AS7"] = [1.2945617708102077, 103.77115679974798]
        coordinates["AS8"] = [1.2961353873044867, 103.77207885443464]
        coordinates["BIZ1"] = [1.292623660669996, 103.77414714137413]
        coordinates["BIZ2"] = [1.2933762295973443, 103.77501451728376]
        coordinates["CAPT"] = [1.2933762295973443, 103.77501451728376]
        coordinates["CELS"] = [1.294411011344144, 103.78076417172579]
        coordinates["COM1"] = [1.2948764061055216, 103.77395649927423]
        coordinates["COM2"] = [1.2935772164129489, 103.7741592837536]
        coordinates["E1"] = [1.2985500698439354, 103.77119549169116]
        coordinates["E2"] = [1.2993598687394592, 103.7711423635483]
        coordinates["E2A"] = [1.2990182, 103.7714875]
        coordinates["E3"] = [1.2993243027699033, 103.77168612825712]
        coordinates["E3A"] = [1.3003768930179749, 103.77145604655468]
        coordinates["E4"] = [1.298439954445622, 103.77222768235404]
        coordinates["E4A"] = [1.2986179076481752, 103.77262273463798]
        coordinates["E5"] = [1.2981082552454721, 103.7722243755894]
        coordinates["EA"] = [1.2981082552454721, 103.7722243755894]
        coordinates["EH"] = [1.2917351246659363, 103.77461339347067]
        coordinates["ENG"] = [1.300612137950934, 103.7705817818642]
        coordinates["ERC"] = [1.3062172, 103.7728749]
        coordinates["EW1"] = [1.2988274380292781, 103.77059982927568]
        coordinates["EW2"] = [1.2993791689773466, 103.77243682922185]
        coordinates["GBT"] = [1.2968031, 103.7705455]
        coordinates["HSSMLCR"] = [1.293218888755013, 103.77434492111207]
        coordinates["I3"] = [1.2923067038862432, 103.77580382982545]
        coordinates["KEVII"] = [1.2922060118957746, 103.78084659576416]
        coordinates["LT1"] = [1.2995128919233356, 103.77129296022898]
        coordinates["LT2"] = [1.2993124975071704, 103.77140470268863]
        coordinates["LT3"] = [1.297782788396538, 103.77340105516473]
        coordinates["LT4"] = [1.2974781271276108, 103.7735183186846]
        coordinates["LT6"] = [1.2974781271276108, 103.7735183186846]
        coordinates["LT7"] = [1.3000819751503252, 103.77108408506066]
        coordinates["LT7A"] = [1.3004814583946265, 103.77094760790798]
        coordinates["LT8"] = [1.2941286739949707, 103.77199079513672]
        coordinates["LT9"] = [1.294968895355766, 103.7722506424852]
        coordinates["LT10"] = [1.2949157602130599, 103.7720594590288]
        coordinates["LT11"] = [1.295456827029062, 103.77139878788282]
        coordinates["LT12"] = [1.2949801946461976, 103.77114846994691]
        coordinates["LT13"] = [1.29506943418948, 103.77090632915497]
        coordinates["LT14"] = [1.2957109058743046, 103.7733578704978]
        coordinates["LT15"] = [1.295522499959851, 103.77340877469021]
        coordinates["LT16"] = [1.2939170885884703, 103.77386420264736]
        coordinates["LT17"] = [1.2936062312700383, 103.77401107931558]
        coordinates["LT18"] = [1.2933049908717555, 103.77460509538652]
        coordinates["LT19"] = [1.2937303, 103.7743029]
        coordinates["LT20"] = [1.2958439182978323, 103.77882045948085]
        coordinates["LT21"] = [1.295356780941112, 103.77946703176282]
        coordinates["LT26"] = [1.2964439980596048, 103.78110405867265]
        coordinates["LT28"] = [1.297199706737715, 103.7811495867657]
        coordinates["LT29"] = [1.2970306748465374, 103.78121942281726]
        coordinates["LT31"] = [1.296863036752469, 103.78039359238537]
        coordinates["LT32"] = [1.2961400836523527, 103.77830217071332]
        coordinates["LT33"] = [1.2977441788622253, 103.78090879191791]
        coordinates["LT34"] = [1.2977295044675978, 103.78083854913713]
        coordinates["MD1"] = [1.29553673659013, 103.78043812746127]
        coordinates["MD5"] = [1.29553673659013, 103.78043812746127]
        coordinates["MD4"] = [1.2957451781135965, 103.78087073564531]
        coordinates["MD7"] = [1.296064279348453, 103.78117382526399]
        coordinates["MD9"] = [1.2966962086013787, 103.78134551280169]
        coordinates["MD10"] = [1.2964883988931324, 103.78168113019073]
        coordinates["NAK-AUD"] = [1.305495177478812, 103.77310842275621]
        coordinates["PGPH-FR4"] = [1.290896141645534, 103.78055155277254]
        coordinates["RC4"] = [1.3082432342773747, 103.7728826457169]
        coordinates["RH"] = [1.2997500633015104, 103.77391813424904]
        coordinates["RMI"] = [1.2926128638467618, 103.77548217773439]
        coordinates["RVR"] = [1.297287053455881, 103.77694934606554]
        coordinates["S1A"] = [1.2959638, 103.7782827]
        coordinates["S2"] = [1.2956254, 103.7781376]
        coordinates["S4"] = [1.2952425, 103.7787845]
        coordinates["S5"] = [1.29553333777584, 103.77986222505571]
        coordinates["S6"] = [1.2952425, 103.7787845]
        coordinates["S7"] = [1.2966426, 103.7742052]
        coordinates["S8"] = [1.2961066770026624, 103.7792463148344]
        coordinates["S11"] = [1.2967402501607153, 103.77886266466652]
        coordinates["S12"] = [1.2969946927186957, 103.77863726856482]
        coordinates["S13"] = [1.2967082923732496, 103.7792697342841]
        coordinates["S14"] = [1.2968413874560345, 103.77972381491037]
        coordinates["S16"] = [1.2967088, 103.7803574]
        coordinates["S17"] = [1.2976204877546946, 103.78046365946426]
        coordinates["SDE"] = [1.2973720912301383, 103.77112029684575]
        coordinates["SDE2"] = [1.297217272355957, 103.77113030709059]
        coordinates["SDE4"] = [1.2975205, 103.7702934]
        coordinates["SR_LT19"] = [1.2937125827502152, 103.77432882785799]
        coordinates["TC"] = [1.3058646900451434, 103.7735061935529]
        coordinates["TH"] = [1.2927169615398948, 103.77129374071957]
        coordinates["TP"] = [1.3039978035313131, 103.77340883016588]
        coordinates["USP"] = [1.3064958843341745, 103.77313256263734]
        coordinates["UT"] = [1.304382852208324, 103.7727275490761]
        coordinates["UTSRC"] = [1.3041793140944875, 103.77278119325639]
        coordinates["WT"] = [1.297212239020798, 103.77111796176165]
        coordinates["Y"] = [1.306441772265005, 103.77229837467895]
        if lessonLocation not in coordinates:
            return None
        else:
            return coordinates[lessonLocation]

    # Converts bus stop location to a tuple of (latitude, longtitude)
    def busStopToCoordinates(self, busStop):
        coordinates = {}
        coordinates["AS5"] = [1.2935051, 103.7721019]
        coordinates["BIZ2"] = [1.2936144, 103.7752274]
        coordinates["BGMRT"] = [1.3227282, 103.8150981]
        coordinates["OTHBldg"] = [1.3197524, 103.8179355]
        coordinates["CLB"] = [1.2965560, 103.7725341]
        coordinates["CollegeGreen"] = [1.3233426, 103.8163148]
        coordinates["COM2"] = [1.2943179, 103.7737746]
        coordinates["EA"] = [1.3005759, 103.7701154]
        coordinates["IT"] = [1.2975026, 103.7729143]
        coordinates["KRBusTerminal"] = [1.2941805, 103.7697687]
        coordinates["KRMRT"] = [1.2948452, 103.7843891]
        coordinates["KV"] = [1.3021181, 103.7690797]
        coordinates["LT13"] = [1.2943079, 103.7707974]
        coordinates["LT27"] = [1.2974416, 103.7809810]
        coordinates["Museum"] = [1.3010831, 103.7737210]
        coordinates["OppHSSML"] = [1.2927978, 103.7749974]
        coordinates["OppKRMRT"] = [1.2948703, 103.7845940]
        coordinates["OppNUSS"] = [1.2933308, 103.7723460]
        coordinates["OppTCOMS"] = [1.2938430, 103.7770137]
        coordinates["OppUHall"] = [1.2975153, 103.7781976]
        coordinates["OppUHC"] = [1.2988242, 103.7756263]
        coordinates["OppYIH"] = [1.2989717, 103.7741826]
        coordinates["PGPHse15"] = [1.2930506, 103.7777728]
        coordinates["PGP7"] = [1.2932500, 103.7777805]
        coordinates["PGP"] = [1.2917996, 103.7805096]
        coordinates["PGPR"] = [1.2909979, 103.7809599]
        coordinates["RafflesHall"] = [1.3009674, 103.7727048]
        coordinates["S17"] = [1.2975297, 103.7815259]
        coordinates["TCOMS"] = [1.2936509, 103.7769567]
        coordinates["JapaneseSch"] = [1.3007345, 103.7699712]
        coordinates["UHall"] = [1.2972281, 103.7786707]
        coordinates["UHC"] = [1.2989325, 103.7761967]
        coordinates["UTown"] = [1.3036077, 103.7745592]
        coordinates["Ventus"] = [1.2951861, 103.7705070]
        coordinates["YIH"] = [1.2988997, 103.7743724]
        if busStop not in coordinates:
            return None
        else:
            return coordinates[busStop]

    # Converts either lesson or bus stop location to a tuple of (latitude, longtitude)
    def mapToCoordinates(self, location):
        # Check if location exists in either the bus stop or lesson location hash maps
        if (self.busStopToCoordinates(location)):
            return self.busStopToCoordinates(location)
        else:
            return self.lessonLocationToCoordinates(location)

    # Maps lesson location to the closest 3 bus stops in terms of straight line distance
    def lessonLocationToTop3BusStops(self, lesssonLocation):
        coordinates = {}
        coordinates["Home"] = {"OppKRMRT": 0.0, "KRMRT": 0.0}
        coordinates["OppKRMRT"] = {"OppKRMRT": 0.0, "KRMRT": 0.0}
        coordinates["KRMRT"] = {"OppKRMRT": 0.0, "KRMRT": 0.0}
        coordinates["AS1"] = {"LT13": 1.46047, "Ventus": 1.47472, "CLB": 1.5204, "AS5": 1.69695, "COM2": 1.73752}
        coordinates["AS2"] = {"Ventus": 0.33503, "LT13": 0.44107, "KRBusTerminal": 1.86932, "CLB": 1.94632,
                              "AS5": 2.02644}
        coordinates["AS3"] = {"LT13": 0.68379, "Ventus": 0.92678, "AS5": 1.33822, "KRBusTerminal": 1.91614,
                              "OppNUSS": 2.2466}
        coordinates["AS4"] = {"LT13": 0.99415, "AS5": 1.03775, "Ventus": 1.24641, "OppNUSS": 1.92828,
                              "KRBusTerminal": 2.11467}
        coordinates["AS5"] = {"AS5": 0.58118, "LT13": 1.41914, "OppNUSS": 1.51245, "Ventus": 1.69901, "COM2": 1.9252}
        coordinates["AS6"] = {"CLB": 1.33829, "COM2": 1.35969, "BIZ2": 2.29822, "OppNUSS": 2.34148, "AS5": 2.45174}
        coordinates["AS7"] = {"LT13": 0.62887, "Ventus": 0.92396, "AS5": 1.32474, "KRBusTerminal": 1.77252,
                              "OppNUSS": 2.29309}
        coordinates["AS8"] = {"CLB": 0.59722, "Ventus": 1.60982, "LT13": 1.81381, "IT": 1.90794, "COM2": 2.42495}
        coordinates["BIZ1"] = {"OppHSSML": 0.92698, "TCOMS": 1.2542, "OppTCOMS": 1.2542, "OppNUSS": 1.27802,
                               "BIZ2": 1.28098}
        coordinates["BIZ2"] = {"TCOMS": 0.35161, "OppTCOMS": 0.35161, "OppHSSML": 0.41894, "BIZ2": 0.55577,
                               "COM2": 1.64421}
        coordinates["CAPT"] = {"TCOMS": 0.35161, "OppTCOMS": 0.35161, "OppHSSML": 0.41894, "BIZ2": 0.55577,
                               "COM2": 1.64421}
        coordinates["CELS"] = {"PGP": 2.56213, "S17": 3.00889, "LT27": 3.02335, "PGP HSE 15": 3.23459, "UHall": 3.42918}
        coordinates["COM1"] = {"COM2": 0.67306, "BIZ2": 1.28319, "TCOMS": 1.48496, "OppTCOMS": 1.48496,
                               "OppNUSS": 1.9018}
        coordinates["COM2"] = {"BIZ2": 0.54312, "TCOMS": 0.67799, "OppTCOMS": 0.67799, "COM2": 0.87382,
                               "OppHSSML": 1.05424}
        coordinates["E1"] = {"IT": 0.66349, "EA": 2.11886, "CLB": 2.25077, "RafflesHall": 2.52596, "YIH": 2.68746}
        coordinates["E2"] = {"EA": 1.37778, "IT": 1.46254, "RafflesHall": 1.73969, "Museum": 2.01693, "YIH": 2.77634}
        coordinates["E2A"] = {"IT": 1.09922, "EA": 1.85642, "Museum": 2.15686, "RafflesHall": 2.19173, "YIH": 2.38786}
        coordinates["E3"] = {"IT": 1.42966, "EA": 1.7645, "Museum": 1.80046, "RafflesHall": 2.02972, "YIH": 2.23678}
        coordinates["E3A"] = {"Museum": 1.04997, "EA": 1.09053, "RafflesHall": 1.11825, "IT": 2.45555, "YIH": 2.86428}
        coordinates["E4"] = {"IT": 0.96905, "YIH": 1.68666, "OppYIH": 1.68666, "CLB": 1.80367, "Museum": 2.58326}
        coordinates["E4A"] = {"YIH": 1.26367, "OppYIH": 1.26367, "IT": 1.39936, "CLB": 1.98752, "Museum": 2.42843}
        coordinates["E5"] = {"IT": 0.83662, "CLB": 1.47404, "YIH": 1.79609, "OppYIH": 1.79609, "Museum": 2.91495}
        coordinates["EA"] = {"IT": 0.83662, "CLB": 1.47404, "YIH": 1.79609, "OppYIH": 1.79609, "Museum": 2.91495}
        coordinates["EH"] = {"OppHSSML": 1.28553, "TCOMS": 1.95254, "OppTCOMS": 1.95254, "BIZ2": 2.06509,
                             "OppNUSS": 2.18105}
        coordinates["ENG"] = {"EA": 0.2359, "RafflesHall": 0.3766, "Museum": 1.75101, "KV": 2.34965, "IT": 2.81458}
        coordinates["ERC"] = {"UTown": 3.16524, "KV": 4.8614, "Museum": 5.2281, "RafflesHall": 5.74107, "EA": 6.23827}
        coordinates["EW1"] = {"IT": 1.21434, "EA": 1.69058, "RafflesHall": 2.15718, "Museum": 2.7668, "CLB": 2.82504}
        coordinates["EW2"] = {"YIH": 1.53222, "OppYIH": 1.53222, "Museum": 1.65052, "IT": 1.78347, "EA": 2.35001}
        coordinates["GBT"] = {"IT": 1.41307, "Ventus": 1.45926, "LT13": 1.83213, "CLB": 1.85356,
                              "KRBusTerminal": 2.73763}
        coordinates["HSSMLCR"] = {"BIZ2": 0.65835, "TCOMS": 0.66632, "OppTCOMS": 0.66632, "OppHSSML": 0.71654,
                                  "COM2": 1.27404}
        coordinates["I3"] = {"OppHSSML": 1.02483, "TCOMS": 1.67989, "OppTCOMS": 1.67989, "BIZ2": 1.8841,
                             "COM2": 2.92803}
        coordinates["KEVII"] = {"PGP": 0.59092, "PGPR": 1.24947, "PGP HSE 15": 1.53225, "PGP7": 1.95793,
                                "KRMRT": 4.01039}
        coordinates["LT1"] = {"EA": 1.35145, "IT": 1.5953, "RafflesHall": 1.66265, "Museum": 1.80593, "YIH": 2.66359}
        coordinates["LT2"] = {"IT": 1.3907, "EA": 1.57525, "RafflesHall": 1.89205, "Museum": 1.92292, "YIH": 2.50978}
        coordinates["LT3"] = {"YIH": 1.14865, "OppYIH": 1.14865, "CLB": 1.52154, "IT": 1.9971, "OppUHC": 2.43057}
        coordinates["LT4"] = {"YIH": 1.39852, "OppYIH": 1.39852, "CLB": 1.40152, "IT": 2.15567, "OppUHC": 2.48381}
        coordinates["LT6"] = {"YIH": 1.39852, "OppYIH": 1.39852, "CLB": 1.40152, "IT": 2.15567, "OppUHC": 2.48381}
        coordinates["LT7"] = {"EA": 0.8264, "RafflesHall": 1.065, "Museum": 1.52465, "IT": 2.18444, "YIH": 3.05167}
        coordinates["LT7A"] = {"EA": 0.5752, "RafflesHall": 0.66149, "Museum": 1.4418, "IT": 2.60087, "KV": 2.64579}
        coordinates["LT8"] = {"AS5": 0.67012, "OppNUSS": 1.36991, "LT13": 1.55773, "COM2": 1.65815, "Ventus": 1.79573}
        coordinates["LT9"] = {"AS5": 1.54454, "COM2": 1.55185, "LT13": 1.56686, "Ventus": 1.62203, "CLB": 1.68088}
        coordinates["LT10"] = {"LT13": 1.37699, "Ventus": 1.45186, "AS5": 1.45975, "COM2": 1.70486, "CLB": 1.75978}
        coordinates["LT11"] = {"Ventus": 0.73279, "LT13": 0.86152, "CLB": 1.54783, "AS5": 2.05399,
                               "KRBusTerminal": 2.30023}
        coordinates["LT12"] = {"LT13": 0.46469, "Ventus": 0.60133, "AS5": 1.69129, "KRBusTerminal": 1.86907,
                               "CLB": 2.07712}
        coordinates["LT13"] = {"LT13": 0.24127, "Ventus": 0.36395, "KRBusTerminal": 1.683, "AS5": 1.88712,
                               "CLB": 2.16482}
        coordinates["LT14"] = {"CLB": 1.34269, "COM2": 1.45745, "BIZ2": 2.30957, "OppNUSS": 2.51171, "TCOMS": 2.51196}
        coordinates["LT15"] = {"COM2": 1.26281, "CLB": 1.51352, "BIZ2": 2.12604, "TCOMS": 2.33049, "OppTCOMS": 2.33049}
        coordinates["LT16"] = {"COM2": 0.42678, "BIZ2": 0.79915, "TCOMS": 0.99563, "OppTCOMS": 0.99563,
                               "OppNUSS": 1.09489}
        coordinates["LT17"] = {"BIZ2": 0.6721, "COM2": 0.76951, "TCOMS": 0.82195, "OppTCOMS": 0.82195,
                               "OppNUSS": 1.06471}
        coordinates["LT18"] = {"TCOMS": 0.43356, "OppTCOMS": 0.43356, "BIZ2": 0.49729, "OppHSSML": 0.53522,
                               "COM2": 1.37154}
        coordinates["LT19"] = {"BIZ2": 0.3586, "TCOMS": 0.53003, "OppTCOMS": 0.53003, "COM2": 0.8606,
                               "OppHSSML": 1.04898}
        coordinates["LT20"] = {"UHall": 1.36516, "OppUHall": 1.79741, "S17": 2.50221, "LT27": 2.61792, "PGP": 4.24756}
        coordinates["LT21"] = {"UHall": 1.97475, "S17": 2.43692, "LT27": 2.52254, "OppUHall": 2.5438, "PGP": 3.58558}
        coordinates["LT26"] = {"LT27": 1.00761, "S17": 1.03345, "UHall": 2.44572, "OppUHall": 3.22732, "KRMRT": 4.45514}
        coordinates["LT28"] = {"LT27": 0.33873, "S17": 0.44403, "UHall": 2.3687, "OppUHall": 3.11861, "KRMRT": 4.93051}
        coordinates["LT29"] = {"LT27": 0.51087, "S17": 0.59909, "UHall": 2.445, "OppUHall": 3.20665, "KRMRT": 4.76106}
        coordinates["LT31"] = {"S17": 0.6688, "LT27": 0.76262, "UHall": 1.64928, "OppUHall": 2.427, "PGP": 4.98101}
        coordinates["LT32"] = {"UHall": 1.17077, "OppUHall": 1.3493, "S17": 2.77462, "LT27": 2.90304, "OppUHC": 3.86242}
        coordinates["LT33"] = {"LT27": 0.31305, "S17": 0.35514, "UHall": 2.19428, "OppUHall": 2.88024,
                               "OppUHC": 5.45378}
        coordinates["LT34"] = {"LT27": 0.30504, "S17": 0.31845, "UHall": 2.12258, "OppUHall": 2.80892,
                               "OppUHC": 5.38817}
        coordinates["MD1"] = {"S17": 1.91115, "LT27": 1.9505, "UHall": 2.35397, "OppUHall": 3.07493, "PGP": 3.65554}
        coordinates["MD5"] = {"S17": 1.91115, "LT27": 1.9505, "UHall": 2.35397, "OppUHall": 3.07493, "PGP": 3.65554}
        coordinates["MD4"] = {"S17": 1.67812, "LT27": 1.68632, "UHall": 2.55122, "OppUHall": 3.30988, "PGP": 3.89761}
        coordinates["MD7"] = {"LT27": 1.39363, "S17": 1.41621, "UHall": 2.65242, "OppUHall": 3.43024, "KRMRT": 4.17118}
        coordinates["MD9"] = {"LT27": 0.85828, "S17": 0.92838, "UHall": 2.61528, "OppUHall": 3.39139, "KRMRT": 4.43773}
        coordinates["MD10"] = {"LT27": 1.22289, "S17": 1.30722, "UHall": 2.98829, "OppUHall": 3.76747, "KRMRT": 4.05149}
        coordinates["NAK-AUD"] = {"UTown": 2.43867, "Museum": 4.54793, "KV": 4.55051, "RafflesHall": 5.20373,
                                  "EA": 5.69284}
        coordinates["PGPH-FR4"] = {"PGPR": 0.6382, "PGP7": 0.77394, "PGP": 1.00599, "PGP HSE 15": 1.77916,
                                   "KRMRT": 4.88921}
        coordinates["RC4"] = {"UTown": 4.99044, "KV": 6.48243, "Museum": 7.24541, "RafflesHall": 7.63614, "EA": 8.13727}
        coordinates["RH"] = {"YIH": 0.91923, "OppYIH": 0.91923, "OppUHC": 1.87291, "UHC": 1.87291, "Museum": 2.07117}
        coordinates["RMI"] = {"OppHSSML": 0.58284, "TCOMS": 1.24684, "OppTCOMS": 1.24684, "BIZ2": 1.44691,
                              "COM2": 2.48408}
        coordinates["RVR"] = {"OppUHall": 1.1071, "UHall": 1.83324, "OppUHC": 2.10007, "UHC": 2.10007, "YIH": 3.44696}
        coordinates["S1A"] = {"UHall": 1.3407, "OppUHall": 1.51945, "S17": 2.87699, "LT27": 3.00259, "OppUHC": 3.97582}
        coordinates["S2"] = {"UHall": 1.70881, "OppUHall": 1.84117, "S17": 3.18091, "LT27": 3.30219, "TCOMS": 3.83944}
        coordinates["S4"] = {"UHall": 1.966, "OppUHall": 2.34233, "S17": 2.9427, "LT27": 3.04557, "PGP": 3.70805}
        coordinates["S5"] = {"UHall": 1.99385, "S17": 2.09101, "LT27": 2.16417, "OppUHall": 2.65336, "PGP": 3.68388}
        coordinates["S6"] = {"UHall": 1.966, "OppUHall": 2.34233, "S17": 2.9427, "LT27": 3.04557, "PGP": 3.70805}
        coordinates["S7"] = {"CLB": 1.813, "YIH": 2.2154, "OppYIH": 2.2154, "COM2": 2.42746, "OppUHC": 2.61685}
        coordinates["S8"] = {"UHall": 1.19609, "OppUHall": 1.81452, "S17": 2.00697, "LT27": 2.12053, "PGP": 4.36685}
        coordinates["S11"] = {"UHall": 0.47534, "OppUHall": 1.09413, "S17": 2.01916, "LT27": 2.15349, "OppUHC": 3.92057}
        coordinates["S12"] = {"UHall": 0.25757, "OppUHall": 0.75792, "S17": 2.16882, "LT27": 2.30671, "OppUHC": 3.59417}
        coordinates["S13"] = {"UHall": 0.6994, "OppUHall": 1.44156, "S17": 1.65506, "LT27": 1.78546, "OppUHC": 4.28393}
        coordinates["S14"] = {"UHall": 1.01186, "S17": 1.19024, "LT27": 1.31784, "OppUHall": 1.79321, "OppUHC": 4.62133}
        coordinates["S16"] = {"S17": 0.81914, "LT27": 0.90486, "UHall": 1.6538, "OppUHall": 2.43529, "PGP": 4.8266}
        coordinates["S17"] = {"S17": 0.36116, "LT27": 0.47774, "UHall": 1.73246, "OppUHall": 2.4265, "OppUHC": 5.0484}
        coordinates["SDE"] = {"IT": 0.62082, "CLB": 1.46566, "Ventus": 2.07127, "LT13": 2.43533, "YIH": 3.11165}
        coordinates["SDE2"] = {"IT": 0.75757, "CLB": 1.38609, "Ventus": 1.92273, "LT13": 2.28512, "YIH": 3.1786}
        coordinates["SDE4"] = {"IT": 1.18539, "Ventus": 2.20409, "CLB": 2.27455, "LT13": 2.57408, "EA": 2.98326}
        coordinates["SR_LT19"] = {"BIZ2": 0.33734, "TCOMS": 0.50263, "OppTCOMS": 0.50263, "COM2": 0.89186,
                                  "OppHSSML": 1.01842}
        coordinates["TC"] = {"UTown": 2.55129, "Museum": 4.99396, "KV": 5.09153, "RafflesHall": 5.72454, "EA": 6.2104}
        coordinates["TH"] = {"AS5": 0.9624, "OppNUSS": 1.79679, "LT13": 2.34013, "KRBusTerminal": 2.47747,
                             "Ventus": 2.70453}
        coordinates["TP"] = {"UTown": 1.25326, "Museum": 3.18074, "KV": 4.10407, "RafflesHall": 4.17801, "EA": 4.6296}
        coordinates["USP"] = {"UTown": 3.28192, "KV": 5.24089, "Museum": 5.53867, "RafflesHall": 6.10219, "EA": 6.59807}
        coordinates["UT"] = {"UTown": 2.03047, "Museum": 3.3894, "KV": 3.62547, "RafflesHall": 4.05569, "EA": 4.53877}
        coordinates["UTSRC"] = {"UTown": 1.90511, "Museum": 3.19563, "KV": 3.58471, "RafflesHall": 3.91742,
                                "EA": 4.39521}
        coordinates["WT"] = {"IT": 0.76685, "CLB": 1.39528, "Ventus": 1.91494, "LT13": 2.2778, "YIH": 3.19179}
        coordinates["Y"] = {"UTown": 3.68305, "KV": 4.66024, "Museum": 5.41919, "RafflesHall": 5.7423, "EA": 6.24343}

        busStopsNames = []
        busStopsCoordinates = []

        for k in coordinates[lesssonLocation].keys():
            busStopsNames.append(k)
            busStopsCoordinates.append(coordinates[lesssonLocation][k])

        return (busStopsNames, busStopsCoordinates)

    def getClosestBusStops(self, location):
        coordinates = {}
        coordinates["AS5"] = [1.2935051, 103.7721019]
        coordinates["BIZ2"] = [1.2936144, 103.7752274]
        coordinates["BGMRT"] = [1.3227282, 103.8150981]
        coordinates["OTHBldg"] = [1.3197524, 103.8179355]
        coordinates["CLB"] = [1.2965560, 103.7725341]
        coordinates["CollegeGreen"] = [1.3233426, 103.8163148]
        coordinates["COM2"] = [1.2943179, 103.7737746]
        coordinates["EA"] = [1.3005759, 103.7701154]
        coordinates["IT"] = [1.2975026, 103.7729143]
        coordinates["KRBusTerminal"] = [1.2941805, 103.7697687]
        coordinates["KRMRT"] = [1.2948452, 103.7843891]
        coordinates["KV"] = [1.3021181, 103.7690797]
        coordinates["LT13"] = [1.2943079, 103.7707974]
        coordinates["LT27"] = [1.2974416, 103.7809810]
        coordinates["Museum"] = [1.3010831, 103.7737210]
        coordinates["OppHSSML"] = [1.2927978, 103.7749974]
        coordinates["OppKRMRT"] = [1.2948703, 103.7845940]
        coordinates["OppNUSS"] = [1.2933308, 103.7723460]
        coordinates["OppTCOMS"] = [1.2938430, 103.7770137]
        coordinates["OppUHall"] = [1.2975153, 103.7781976]
        coordinates["OppUHC"] = [1.2988242, 103.7756263]
        coordinates["OppYIH"] = [1.2989717, 103.7741826]
        coordinates["PGPHse15"] = [1.2930506, 103.7777728]
        coordinates["PGP7"] = [1.2932500, 103.7777805]
        coordinates["PGP"] = [1.2917996, 103.7805096]
        coordinates["PGPR"] = [1.2909979, 103.7809599]
        coordinates["RafflesHall"] = [1.3009674, 103.7727048]
        coordinates["S17"] = [1.2975297, 103.7815259]
        coordinates["TCOMS"] = [1.2936509, 103.7769567]
        coordinates["JapaneseSch"] = [1.3007345, 103.7699712]
        coordinates["UHall"] = [1.2972281, 103.7786707]
        coordinates["UHC"] = [1.2989325, 103.7761967]
        coordinates["UTown"] = [1.3036077, 103.7745592]
        coordinates["Ventus"] = [1.2951861, 103.7705070]
        coordinates["YIH"] = [1.2988997, 103.7743724]

        PQ = Q.PriorityQueue()
        uC = self.mapToCoordinates(location)
        for k, v in coordinates.items():
            vC = v
            # Calculate the distance between the given location and all the bus stops, and insert them into a PriorityQueue
            distanceT = self.distance(uC[0], uC[1], vC[0], vC[1], "K")
            distObj = Distance(k, distanceT)
            PQ.put(distObj)

        busStopsNames = []
        busStopsCoordinates = []
        while not PQ.empty():
            distObj = PQ.get()
            busStopsNames.append(distObj.busStop)
            busStopsCoordinates.append(distObj.mydistance)

        return (busStopsNames, busStopsCoordinates)

    # Outputs the next bus stop in the bus route, returns "" if the it is the last stop in the bus route
    def getNextBusStop(self, busStop, bus):
        hm = {}
        hm["A1"] = ["PGP", "KRMRT", "LT27", "UHall", "OppUHC", "YIH", "CLB", "LT13", "AS5", "COM2", "BIZ2", "OppTCOMS",
                    "PGP7", "PGP"]
        hm["A1E"] = ["KRMRT", "LT27", "OppUHC", "CLB", "BIZ2", "PGP"]
        hm["A2"] = ["PGP", "PGPHse15", "TCOMS", "OppHSSML", "OppNUSS", "COM2", "Ventus", "IT", "OppYIH", "Museum",
                    "UHC", "OppUHall", "S17", "OppKRMRT", "PGP"]
        hm["A2E"] = ["Ventus", "IT", "S17", "OppKRMRT"]
        hm["B1"] = ["KRBusTerminal", "IT", "OppYIH", "UTown", "YIH", "CLB", "LT13", "AS5", "BIZ2"]
        hm["B2"] = ["OppHSSML", "OppNUSS", "Ventus", "IT", "OppYIH", "UTown", "RafflesHall", "EA", "KRBusTerminal"]
        hm["C"] = ["KRBusTerminal", "JapaneseSch", "KV", "Museum", "UTown", "UHC", "OppUHall", "S17", "LT27", "UHall",
                   "OppUHC", "UTown", "RafflesHall", "EA", "KRBusTerminal"]
        hm["D1"] = ["OppHSSML", "OppNUSS", "COM2", "Ventus", "IT", "OppYIH", "Museum", "UTown", "YIH", "CLB", "LT13",
                    "AS5", "COM2", "BIZ2"]
        hm["D2"] = ["OppTCOMS", "PGP", "KRMRT", "LT27", "UHall", "OppUHC", "Museum", "UTown", "UHC", "OppUHall", "S17",
                    "OppKRMRT", "PGPR", "TCOMS"]
        hm["BTC1"] = ["KRBusTerminal", "KV", "Museum", "YIH", "CLB", "LT13", "AS5", "BIZ2", "PGP", "CollegeGreen",
                      "OTHBldg"]
        hm["BTC2"] = ["OTHBldg", "BGMRT", "Museum", "EA", "KRBusTerminal"]

        stops = hm[bus]
        if busStop not in stops:
            return ""

        prev = ""
        result = ""
        for i in range(0, len(stops)):
            if i == len(stops) - 1:
                return ""
            elif prev == "":
                prev = stops[i]
            else:
                if prev == busStop:
                    result = stops[i]
                    break;
                else:
                    prev = stops[i]

        return result

        
        
        


    # Outputs the bus route
    def getBusRoute(self,bus):
        hm = {}
        hm["A1"] = ["PGP", "KRMRT", "LT27", "UHall", "OppUHC", "YIH", "CLB", "LT13", "AS5", "COM2", "BIZ2", "OppTCOMS",
                    "PGP7", "PGP"]
        hm["A1E"] = ["KRMRT", "LT27", "OppUHC", "CLB", "BIZ2", "PGP"]
        hm["A2"] = ["PGP", "PGPHse15", "TCOMS", "OppHSSML", "OppNUSS", "COM2", "Ventus", "IT", "OppYIH", "Museum",
                    "UHC", "OppUHall", "S17", "OppKRMRT", "PGP"]
        hm["A2E"] = ["Ventus", "IT", "S17", "OppKRMRT"]
        hm["B1"] = ["KRBusTerminal", "IT", "OppYIH", "UTown", "YIH", "CLB", "LT13", "AS5", "BIZ2"]
        hm["B2"] = ["OppHSSML", "OppNUSS", "Ventus", "IT", "OppYIH", "UTown", "RafflesHall", "EA", "KRBusTerminal"]
        hm["C"] = ["KRBusTerminal", "JapaneseSch", "KV", "Museum", "UTown", "UHC", "OppUHall", "S17", "LT27", "UHall",
                   "OppUHC", "UTown", "RafflesHall", "EA", "KRBusTerminal"]
        hm["D1"] = ["OppHSSML", "OppNUSS", "COM2", "Ventus", "IT", "OppYIH", "Museum", "UTown", "YIH", "CLB", "LT13",
                    "AS5", "COM2", "BIZ2"]
        hm["D2"] = ["OppTCOMS", "PGP", "KRMRT", "LT27", "UHall", "OppUHC", "Museum", "UTown", "UHC", "OppUHall", "S17",
                    "OppKRMRT", "PGPR", "TCOMS"]
        hm["BTC1"] = ["KRBusTerminal", "KV", "Museum", "YIH", "CLB", "LT13", "AS5", "BIZ2", "PGP", "CollegeGreen",
                      "OTHBldg"]
        hm["BTC2"] = ["OTHBldg", "BGMRT", "Museum", "EA", "KRBusTerminal"]

        stops = hm[bus]
        routeWithArrows= ""
        for n, string in enumerate(stops):
            if n == len(stops) -1 :
                routeWithArrows = routeWithArrows + string + " "
            else :    
                routeWithArrows = routeWithArrows + string + " -> "
        return routeWithArrows


# Driver program
g = Graph()
#Shortest distance from source lesson location to destination lesson location
#results = g.dijkstra("COM1", "OppUHall");
#print(results)

