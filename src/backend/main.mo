import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Text "mo:core/Text";

actor {
  module Submission {
    public func compare(sub1 : Submission, sub2 : Submission) : Order.Order {
      Int.compare(sub2.timestamp, sub1.timestamp);
    };
  };

  type HostingPlanType = {
    #sharedPlan;
    #vps;
    #dedicated;
    #cloud;
  };

  type Submission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type HostingPlan = {
    planType : HostingPlanType;
    name : Text;
    description : Text;
    price : Float;
    features : [Text];
  };

  type FAQ = {
    question : Text;
    answer : Text;
  };

  type Testimonial = {
    name : Text;
    company : Text;
    quote : Text;
    rating : Nat8;
  };

  let submissions = Map.empty<Text, Submission>();
  let hostingPlans = Map.empty<Text, HostingPlan>();
  let faqs = Map.empty<Text, FAQ>();
  let testimonials = Map.empty<Text, Testimonial>();

  public type ContactFormInput = {
    name : Text;
    email : Text;
    message : Text;
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

  public shared ({ caller }) func addHostingPlan(plan : HostingPlan) : async () {
    hostingPlans.add(plan.name, plan);
  };

  public query ({ caller }) func getHostingPlans() : async [HostingPlan] {
    hostingPlans.values().toArray();
  };

  public shared ({ caller }) func addFAQ(faq : FAQ) : async () {
    faqs.add(faq.question, faq);
  };

  public query ({ caller }) func getFAQs() : async [FAQ] {
    faqs.values().toArray();
  };

  public shared ({ caller }) func addTestimonial(testimonial : Testimonial) : async () {
    testimonials.add(testimonial.name, testimonial);
  };

  public query ({ caller }) func getTestimonials() : async [Testimonial] {
    testimonials.values().toArray();
  };
};
