import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription Name is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minLength: [3, "Subscription Name must be at least 3 characters"],
      maxLength: [
        100,
        "Subscription Name must not be more than 100 characters",
      ],
    },
    price: {
      type: Number,
      required: [true, "Subscription Price is required"],
      min: [0, "Subscription Price must be a positive number"],
    },
    currency: {
      type: String,
      enum: {
        values: ["USD", "EUR", "GBP", "PLN"],
        default: "PLN",
      },
    },
    frequency: {
      type: String,
      enum: {
        values: ["daily", "weekly", "monthly", "yearly"],
        default: "monthly",
      },
    },
    catregory: {
      type: String,
      enum: {
        values: ["entertainment", "health", "sports", "technology", "other"],
        default: "other",
      },
      required: [true, "Subscription Category is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Subscription Payment Method is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["active", "cancelled", "expired"],
        default: "active",
      },
    },
    startDate: {
      type: Date,
      required: [true, "Subscription Start Date is required"],
      validate: {
        validator: (startDate) => startDate > new Date(),
        message: "Subscription Start Date must be a future date",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (renewalDate) {
          return renewalDate > this.startDate;
        },
        message: "Subscription Renewal Date must be after the Start Date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalDate = new Date(this.startDate);
    switch (this.frequency) {
      case "daily":
        renewalDate.setDate(renewalDate.getDate() + 1);
        break;
      case "weekly":
        renewalDate.setDate(renewalDate.getDate() + 7);
        break;
      case "monthly":
        renewalDate.setMonth(renewalDate.getMonth() + 1);
        break;
      case "yearly":
        renewalDate.setFullYear(renewalDate.getFullYear() + 1);
        break;
      default:
        break;
    }
    this.renewalDate = renewalDate;
  }

  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
