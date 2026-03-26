// @ts-nocheck
export const idlService = ({ IDL }) => {
  const ContactFormInput = IDL.Record({
    'name' : IDL.Text,
    'email' : IDL.Text,
    'message' : IDL.Text,
  });
  const Time = IDL.Int;
  const Submission = IDL.Record({
    'name' : IDL.Text,
    'email' : IDL.Text,
    'message' : IDL.Text,
    'timestamp' : Time,
  });
  const VPSPlan = IDL.Record({
    'id' : IDL.Text,
    'ram' : IDL.Text,
    'features' : IDL.Vec(IDL.Text),
    'name' : IDL.Text,
    'cores' : IDL.Text,
    'category' : IDL.Text,
    'price' : IDL.Nat,
  });
  const VPSPlanInput = IDL.Record({
    'id' : IDL.Text,
    'ram' : IDL.Text,
    'features' : IDL.Vec(IDL.Text),
    'name' : IDL.Text,
    'cores' : IDL.Text,
    'category' : IDL.Text,
    'price' : IDL.Nat,
  });
  return IDL.Service({
    'addCategory' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'addVPSPlan' : IDL.Func([VPSPlanInput], [IDL.Text], []),
    'adminLogin' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'deleteCategory' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'deleteVPSPlan' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'getAllSubmissions' : IDL.Func([], [IDL.Vec(Submission)], ['query']),
    'getCategories' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getVPSPlans' : IDL.Func([], [IDL.Vec(VPSPlan)], ['query']),
    'submitContactForm' : IDL.Func([ContactFormInput], [], []),
    'updateVPSPlan' : IDL.Func([IDL.Text, VPSPlan], [IDL.Bool], []),
  });
};
export const idlInitArgs = [];
export const idlFactory = idlService;
export const init = ({ IDL }) => { return []; };
