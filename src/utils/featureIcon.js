import {
  ShoppingCart,
  BarChart2,
  FileText,
  HelpCircle,
  CreditCard,
  Users,
  Settings,
  Bell,
  Mail,
  Calendar,
  Image,
  Shield,
  Search,
  Database,
  Globe,
  Package,
  Code,
  LayoutDashboard,
  Plug,
  Star,
  Zap,
} from "lucide-react";

export const getFeatureIcon = (name = "") => {
  const featureName = name.toLowerCase();

  if (
    featureName.includes("shop") ||
    featureName.includes("cart") ||
    featureName.includes("ecommerce") ||
    featureName.includes("woocommerce")
  ) {
    return ShoppingCart;
  }

  if (
    featureName.includes("analytics") ||
    featureName.includes("chart") ||
    featureName.includes("report")
  ) {
    return BarChart2;
  }

  if (
    featureName.includes("blog") ||
    featureName.includes("article") ||
    featureName.includes("content")
  ) {
    return FileText;
  }

  if (
    featureName.includes("faq") ||
    featureName.includes("help") ||
    featureName.includes("question")
  ) {
    return HelpCircle;
  }

  if (
    featureName.includes("payment") ||
    featureName.includes("stripe") ||
    featureName.includes("billing")
  ) {
    return CreditCard;
  }

  if (
    featureName.includes("user") ||
    featureName.includes("member") ||
    featureName.includes("team")
  ) {
    return Users;
  }

  if (
    featureName.includes("setting") ||
    featureName.includes("config")
  ) {
    return Settings;
  }

  if (
    featureName.includes("notification") ||
    featureName.includes("alert")
  ) {
    return Bell;
  }

  if (
    featureName.includes("email") ||
    featureName.includes("mail")
  ) {
    return Mail;
  }

  if (
    featureName.includes("calendar") ||
    featureName.includes("booking")
  ) {
    return Calendar;
  }

  if (
    featureName.includes("image") ||
    featureName.includes("gallery") ||
    featureName.includes("media")
  ) {
    return Image;
  }

  if (
    featureName.includes("security") ||
    featureName.includes("auth") ||
    featureName.includes("permission")
  ) {
    return Shield;
  }

  if (
    featureName.includes("search")
  ) {
    return Search;
  }

  if (
    featureName.includes("database") ||
    featureName.includes("data")
  ) {
    return Database;
  }

  if (
    featureName.includes("api") ||
    featureName.includes("integration")
  ) {
    return Plug;
  }

  if (
    featureName.includes("code") ||
    featureName.includes("developer")
  ) {
    return Code;
  }

  if (
    featureName.includes("dashboard")
  ) {
    return LayoutDashboard;
  }

  if (
    featureName.includes("global") ||
    featureName.includes("language")
  ) {
    return Globe;
  }

  if (
    featureName.includes("package") ||
    featureName.includes("module")
  ) {
    return Package;
  }

  if (
    featureName.includes("premium") ||
    featureName.includes("rating")
  ) {
    return Star;
  }

  return Zap;
};