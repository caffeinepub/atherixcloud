import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Int "mo:core/Int";



actor {
  module Submission {
    public func compare(sub1 : Submission, sub2 : Submission) : Order.Order {
      Int.compare(sub2.timestamp, sub1.timestamp);
    };
  };

  type Submission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type VPSPlan = {
    id : Text;
    category : Text;
    name : Text;
    price : Nat;
    ram : Text;
    cores : Text;
    features : [Text];
  };

  let submissions = Map.empty<Text, Submission>();
  let vpsPlans = Map.empty<Text, VPSPlan>();
  let categories = Map.empty<Text, Text>();

  // Seed default categories
  do {
    categories.add("Intel VPS", "Intel VPS");
    categories.add("Cheap VPS", "Cheap VPS");
  };

  // Seed default plans on first initialization
  do {
    let defaultPlans : [VPSPlan] = [
      { id = "i1"; category = "Intel VPS"; name = "8 GB Indian Node"; price = 30; ram = "8 GB"; cores = "2"; features = ["Full Root Access", "DDoS Protection", "50 GB NVMe", "Ubuntu / Debian OS", "Monthly Billing", "Pterodactyl + Wings Supported", "Share IPv4"] },
      { id = "i2"; category = "Intel VPS"; name = "16 GB Indian Node"; price = 90; ram = "16 GB"; cores = "4"; features = ["Full Root Access", "DDoS Protection", "100 GB NVMe", "Ubuntu / Debian OS", "Monthly Billing", "Pterodactyl + Wings Supported", "Share IPv4"] },
      { id = "i3"; category = "Intel VPS"; name = "32 GB Indian Node"; price = 100; ram = "32 GB"; cores = "6"; features = ["Full Root Access", "DDoS Protection", "200 GB NVMe", "Ubuntu / Debian OS", "Monthly Billing", "Pterodactyl + Wings Supported", "Share IPv4"] },
      { id = "i4"; category = "Intel VPS"; name = "48 GB Indian Node"; price = 200; ram = "48 GB"; cores = "8"; features = ["Full Root Access", "DDoS Protection", "350 GB NVMe", "Ubuntu / Debian OS", "Monthly Billing", "Pterodactyl + Wings Supported", "Share IPv4"] },
      { id = "i5"; category = "Intel VPS"; name = "64 GB Indian Node"; price = 300; ram = "64 GB"; cores = "12"; features = ["Full Root Access", "DDoS Protection", "500 GB NVMe", "Ubuntu / Debian OS", "Monthly Billing", "Pterodactyl + Wings Supported", "Share IPv4"] },
      { id = "c1"; category = "Cheap VPS"; name = "Basic"; price = 60; ram = "4 GB"; cores = "1"; features = ["Full Root Access", "DDoS Protection", "30 GB NVMe SSD", "Ubuntu / Debian OS", "Monthly Billing", "Pterodactyl + Wings Supported", "Share IPv4"] },
      { id = "c2"; category = "Cheap VPS"; name = "Standard"; price = 120; ram = "8 GB"; cores = "2"; features = ["Full Root Access", "DDoS Protection", "50 GB NVMe SSD", "Ubuntu / Debian OS", "Monthly Billing", "Pterodactyl + Wings Supported", "Share IPv4"] },
      { id = "c3"; category = "Cheap VPS"; name = "Pro"; price = 200; ram = "12 GB"; cores = "3"; features = ["Full Root Access", "DDoS Protection", "100 GB NVMe SSD", "Ubuntu / Debian OS", "Monthly Billing", "Pterodactyl + Wings Supported", "Share IPv4"] },
      { id = "c4"; category = "Cheap VPS"; name = "Elite"; price = 320; ram = "16 GB"; cores = "4"; features = ["Full Root Access", "DDoS Protection", "150 GB NVMe SSD", "Ubuntu / Debian OS", "Monthly Billing", "Pterodactyl + Wings Supported", "Share IPv4"] },
    ];
    for (plan in defaultPlans.vals()) {
      vpsPlans.add(plan.id, plan);
    };
  };

  public type ContactFormInput = {
    name : Text;
    email : Text;
    message : Text;
  };

  public shared ({ caller }) func adminLogin(email : Text, password : Text) : async Bool {
    email == "enderop67@gmail.com" and password == "enderop67gg#";
  };

  public shared ({ caller }) func submitContactForm(input : ContactFormInput) : async () {
    let timestamp = Time.now();
    let id = timestamp.toText();
    let submission : Submission = {
      input with timestamp;
    };
    submissions.add(id, submission);
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    submissions.values().toArray().sort();
  };

  public type VPSPlanInput = {
    id : Text;
    category : Text;
    name : Text;
    price : Nat;
    ram : Text;
    cores : Text;
    features : [Text];
  };

  public shared ({ caller }) func addVPSPlan(input : VPSPlanInput) : async Text {
    let plan : VPSPlan = input;
    vpsPlans.add(input.id, plan);
    input.id;
  };

  public query ({ caller }) func getVPSPlans() : async [VPSPlan] {
    vpsPlans.values().toArray();
  };

  public shared ({ caller }) func updateVPSPlan(id : Text, plan : VPSPlan) : async Bool {
    if (vpsPlans.containsKey(id)) {
      vpsPlans.add(id, plan);
      true;
    } else {
      false;
    };
  };

  public shared ({ caller }) func deleteVPSPlan(id : Text) : async Bool {
    if (vpsPlans.containsKey(id)) {
      vpsPlans.remove(id);
      true;
    } else {
      false;
    };
  };

  // Category management
  public query ({ caller }) func getCategories() : async [Text] {
    categories.values().toArray();
  };

  public shared ({ caller }) func addCategory(name : Text) : async Bool {
    if (categories.containsKey(name)) {
      false;
    } else {
      categories.add(name, name);
      true;
    };
  };

  public shared ({ caller }) func deleteCategory(name : Text) : async Bool {
    if (categories.containsKey(name)) {
      categories.remove(name);
      true;
    } else {
      false;
    };
  };
};
